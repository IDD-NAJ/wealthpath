import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("=== EDGE FUNCTION START ===");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    
    // Test environment variables first
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    console.log("Environment variables:", {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPreview: supabaseUrl?.substring(0, 20) + "...",
    });
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing environment variables!");
      return new Response(
        JSON.stringify({ 
          error: "Server configuration error",
          details: `Missing: ${!supabaseUrl ? 'SUPABASE_URL ' : ''}${!supabaseKey ? 'SUPABASE_SERVICE_ROLE_KEY' : ''}`
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Test request body parsing
    let requestBody;
    try {
      const text = await req.text();
      console.log("Raw request body length:", text.length);
      console.log("Raw request body preview:", text.substring(0, 100));
      requestBody = JSON.parse(text);
      console.log("Parsed request successfully");
    } catch (parseError) {
      console.error("Request parsing failed:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid request format",
          details: parseError.message
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Test Supabase client creation
    let supabase;
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
      console.log("Supabase client created successfully");
    } catch (clientError) {
      console.error("Supabase client creation failed:", clientError);
      return new Response(
        JSON.stringify({ 
          error: "Database connection error",
          details: clientError.message
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Extract required fields
    const {
      source_name,
      source_url,
      original_url,
      original_title,
      original_content,
      suggested_category,
      image_url,
      html_content
    } = requestBody;

    console.log("Processing article:", {
      title: original_title,
      category: suggested_category,
      contentLength: original_content?.length,
      hasImage: !!image_url
    });

    // Validate required fields
    if (!original_title || !original_content || !suggested_category) {
      console.error("Missing required fields:", {
        hasTitle: !!original_title,
        hasContent: !!original_content,
        hasCategory: !!suggested_category
      });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields",
          details: "title, content, and category are required"
        }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use OpenAI to paraphrase and improve the content
    const openaiApiKey = Deno.env.get("OPENAI_API_KEY");
    if (!openaiApiKey) {
      console.error("OpenAI API key not found");
      return new Response(
        JSON.stringify({ 
          error: "OpenAI API key not configured"
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Calling OpenAI for paraphrasing...");
    
    try {
      const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: `You are a professional news editor. Rewrite news articles to be engaging, well-structured, and between 400-700 words. 

CRITICAL REQUIREMENTS:
1. Make the content completely original while preserving all key facts
2. Use engaging, professional journalism style
3. Ensure 400-700 words (2000-3500 characters)
4. Create compelling headlines
5. Write informative excerpts (2-3 sentences)
6. Keep all factual information accurate

Return ONLY a JSON object with these exact fields:
{
  "paraphrased_title": "engaging headline",
  "paraphrased_content": "400-700 word article",
  "paraphrased_excerpt": "2-3 sentence summary"
}`
            },
            {
              role: "user",
              content: `Original Title: ${original_title}\n\nOriginal Content: ${original_content}\n\nCategory: ${suggested_category}\n\nPlease rewrite this news article according to the requirements.`
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      if (!openaiResponse.ok) {
        throw new Error(`OpenAI API error: ${openaiResponse.status}`);
      }

      const openaiData = await openaiResponse.json();
      console.log("OpenAI response received");

      let paraphrasedData;
      try {
        paraphrasedData = JSON.parse(openaiData.choices[0].message.content);
      } catch (parseError) {
        console.error("Failed to parse OpenAI response:", openaiData.choices[0].message.content);
        throw new Error("Invalid response format from OpenAI");
      }

      // Validate paraphrased content length
      const contentLength = paraphrasedData.paraphrased_content?.length || 0;
      if (contentLength < 2000 || contentLength > 3500) {
        console.warn(`Content length ${contentLength} is outside target range (2000-3500)`);
      }

      // Create draft article
      console.log("Creating draft article in database...");
      
      const { data: draftData, error: draftError } = await supabase
        .from("draft_articles")
        .insert({
          source_name,
          source_url,
          original_url,
          original_title,
          original_content,
          paraphrased_title: paraphrasedData.paraphrased_title,
          paraphrased_content: paraphrasedData.paraphrased_content,
          paraphrased_excerpt: paraphrasedData.paraphrased_excerpt,
          suggested_category,
          image_url,
          status: "pending"
        })
        .select()
        .single();

      if (draftError) {
        console.error("Database insert error:", draftError);
        throw new Error(`Database error: ${draftError.message}`);
      }

      console.log("Draft article created successfully:", draftData.id);

      return new Response(
        JSON.stringify({ 
          success: true,
          message: "Draft article created successfully",
          draft_id: draftData.id,
          title: paraphrasedData.paraphrased_title,
          content_length: paraphrasedData.paraphrased_content.length
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );

    } catch (openaiError) {
      console.error("OpenAI processing error:", openaiError);
      return new Response(
        JSON.stringify({ 
          error: "Content processing failed",
          details: openaiError.message
        }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

  } catch (error) {
    console.error("=== FATAL ERROR ===");
    console.error("Error type:", error.constructor.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: "Internal server error",
        details: error.message,
        type: error.constructor.name
      }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});