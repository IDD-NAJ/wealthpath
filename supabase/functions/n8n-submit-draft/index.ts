import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface DraftSubmission {
  source_name: string;
  source_url: string;
  original_url: string;
  original_title: string;
  original_content: string;
  // Optional - if paraphrasing is done externally
  paraphrased_title?: string;
  paraphrased_content?: string;
  paraphrased_excerpt?: string;
  suggested_category: string;
  image_url?: string;
  html_content?: string; // For extracting images from HTML
}

async function paraphraseContent(title: string, content: string, category: string): Promise<{
  paraphrased_title: string
  paraphrased_content: string
  paraphrased_excerpt: string
}> {
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY')
  if (!openAIApiKey) {
    throw new Error('OpenAI API key not configured')
  }

  console.log("Starting paraphrasing for:", title);

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a professional news editor. Your task is to paraphrase news articles while maintaining accuracy and journalistic integrity. 

CRITICAL REQUIREMENTS:
1. The paraphrased content MUST be between 500-1000 words - this is mandatory
2. If the original content is shorter than 500 words, expand it with relevant context, background information, and detailed explanations while maintaining accuracy
3. If the original content is longer than 1000 words, condense it to the most important information while keeping all key facts
4. Rewrite the content completely in your own words
5. Maintain all key facts, dates, names, and important details
6. Keep the same tone and style appropriate for the "${category}" category
7. Make the content engaging and readable with proper paragraph structure
8. Ensure the paraphrased version is substantially different from the original but conveys the same information
9. Create a compelling excerpt that summarizes the main points in 2-3 sentences

Return your response as a JSON object with these exact keys:
- paraphrased_title: A rewritten headline that captures the essence of the story
- paraphrased_content: The full article rewritten in your own words (MUST be 500-1000 words)
- paraphrased_excerpt: A 2-3 sentence summary of the main points`
        },
        {
          role: 'user',
          content: `Please paraphrase this news article ensuring the content is between 500-1000 words:

Title: ${title}

Content: ${content}

Category: ${category}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('OpenAI API error:', errorText);
    throw new Error('Failed to paraphrase content');
  }

  const data = await response.json();
  const result = JSON.parse(data.choices[0].message.content);
  
  console.log("Paraphrasing completed successfully");
  
  return {
    paraphrased_title: result.paraphrased_title || title,
    paraphrased_content: result.paraphrased_content || content,
    paraphrased_excerpt: result.paraphrased_excerpt || content.substring(0, 200) + '...'
  };
}

async function extractImageFromContent(originalUrl: string, htmlContent?: string): Promise<string | null> {
  try {
    console.log("Extracting image from content for URL:", originalUrl);
    
    // If HTML content is provided, extract images from it
    if (htmlContent) {
      const imgRegex = /<img[^>]+src\s*=\s*['\"]([^'\"]+)['\"][^>]*>/gi;
      const matches = Array.from(htmlContent.matchAll(imgRegex));
      
      if (matches.length > 0) {
        const imageUrl = matches[0][1];
        // Convert relative URLs to absolute URLs
        if (imageUrl.startsWith('/')) {
          const baseUrl = new URL(originalUrl).origin;
          return baseUrl + imageUrl;
        } else if (imageUrl.startsWith('http')) {
          return imageUrl;
        }
      }
    }
    
    // If no image found in HTML content, try fetching the page
    if (originalUrl && originalUrl !== 'unknown') {
      console.log("Fetching page to extract images:", originalUrl);
      
      try {
        const response = await fetch(originalUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        
        if (response.ok) {
          const html = await response.text();
          
          // Try to find Open Graph image
          const ogImageMatch = html.match(/<meta[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i);
          if (ogImageMatch) {
            const imageUrl = ogImageMatch[1];
            if (imageUrl.startsWith('/')) {
              const baseUrl = new URL(originalUrl).origin;
              return baseUrl + imageUrl;
            }
            return imageUrl;
          }
          
          // Try to find Twitter card image
          const twitterImageMatch = html.match(/<meta[^>]*name=["\']twitter:image["\'][^>]*content=["\']([^"\']+)["\'][^>]*>/i);
          if (twitterImageMatch) {
            const imageUrl = twitterImageMatch[1];
            if (imageUrl.startsWith('/')) {
              const baseUrl = new URL(originalUrl).origin;
              return baseUrl + imageUrl;
            }
            return imageUrl;
          }
          
          // Try to find the first image in the content
          const imgMatch = html.match(/<img[^>]+src\s*=\s*['\"]([^'\"]+)['\"][^>]*>/i);
          if (imgMatch) {
            const imageUrl = imgMatch[1];
            if (imageUrl.startsWith('/')) {
              const baseUrl = new URL(originalUrl).origin;
              return baseUrl + imageUrl;
            } else if (imageUrl.startsWith('http')) {
              return imageUrl;
            }
          }
        }
      } catch (fetchError) {
        console.error("Error fetching page for image extraction:", fetchError);
      }
    }
    
    console.log("No image found for article");
    return null;
  } catch (error) {
    console.error("Error extracting image:", error);
    return null;
  }
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("Edge function started, method:", req.method);
    console.log("Request URL:", req.url);
    
    // Check environment variables
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log("Environment check:", {
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseKey: !!supabaseKey,
      supabaseUrlLength: supabaseUrl?.length || 0,
      supabaseKeyLength: supabaseKey?.length || 0
    });
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Missing required environment variables: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    }
    
    console.log("Creating Supabase client...");
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log("Parsing request body...");
    const requestText = await req.text();
    console.log("Raw request body:", requestText);
    
    let draftData: DraftSubmission;
    try {
      draftData = JSON.parse(requestText);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      throw new Error(`Invalid JSON in request body: ${parseError.message}`);
    }
    
    console.log("Received draft submission:", { 
      title: draftData.original_title,
      source: draftData.source_name,
      hasContent: !!draftData.original_content,
      contentLength: draftData.original_content?.length || 0
    });

    // Paraphrase content if not already provided
    let paraphrased_title = draftData.paraphrased_title;
    let paraphrased_content = draftData.paraphrased_content;
    let paraphrased_excerpt = draftData.paraphrased_excerpt;

    if (!paraphrased_title || !paraphrased_content) {
      console.log("Paraphrasing content automatically...");
      
      // Check if OpenAI API key is available
      const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openAIApiKey) {
        console.log("OpenAI API key not found, using original content");
        paraphrased_title = draftData.original_title;
        paraphrased_content = draftData.original_content;
        paraphrased_excerpt = draftData.original_content.substring(0, 200) + '...';
      } else {
        const paraphrased = await paraphraseContent(
          draftData.original_title,
          draftData.original_content,
          draftData.suggested_category
        );
        
        paraphrased_title = paraphrased.paraphrased_title;
        paraphrased_content = paraphrased.paraphrased_content;
        paraphrased_excerpt = paraphrased.paraphrased_excerpt;
      }
    }

    // Extract image if not provided
    let imageUrl = draftData.image_url;
    if (!imageUrl) {
      console.log("No image URL provided, attempting to extract from content...");
      imageUrl = await extractImageFromContent(
        draftData.original_url || draftData.source_url,
        draftData.html_content
      );
      if (imageUrl) {
        console.log("Successfully extracted image:", imageUrl);
      }
    }

    // Find or create news source
    let sourceId: string;
    const { data: existingSource } = await supabase
      .from("news_sources")
      .select("id")
      .eq("url", draftData.source_url)
      .single();

    if (existingSource) {
      sourceId = existingSource.id;
    } else {
      const { data: newSource, error: sourceError } = await supabase
        .from("news_sources")
        .insert({
          name: draftData.source_name,
          url: draftData.source_url,
          active: true
        })
        .select("id")
        .single();

      if (sourceError) {
        console.error("Error creating news source:", sourceError);
        throw sourceError;
      }
      
      sourceId = newSource.id;
    }

    // Create draft article with fallbacks for missing fields
    const { data: draft, error: draftError } = await supabase
      .from("draft_articles")
      .insert({
        source_id: sourceId,
        original_url: draftData.original_url || draftData.source_url || "unknown",
        original_title: draftData.original_title || "Untitled",
        original_content: draftData.original_content || "No content available",
        paraphrased_title: paraphrased_title || draftData.original_title || "Untitled",
        paraphrased_content: paraphrased_content || draftData.original_content || "No content available",
        paraphrased_excerpt: paraphrased_excerpt || (draftData.original_content || "").substring(0, 200) + '...',
        suggested_category: draftData.suggested_category || "General",
        image_url: imageUrl || null,
        status: "pending"
      })
      .select()
      .single();

    if (draftError) {
      console.error("Error creating draft article:", draftError);
      throw draftError;
    }

    console.log("Draft article created successfully:", draft.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        draft_id: draft.id,
        message: "Draft article submitted for review"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in n8n-submit-draft function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);