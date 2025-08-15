import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ScrapeRequest {
  url: string
  extractImages?: boolean
}

interface ScrapeResponse {
  success: boolean
  content?: string
  images?: string[]
  title?: string
  error?: string
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { url, extractImages = true }: ScrapeRequest = await req.json()
    
    if (!url) {
      return new Response(
        JSON.stringify({ success: false, error: 'URL is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const firecrawlApiKey = Deno.env.get('FIRECRAWL_API_KEY')
    if (!firecrawlApiKey) {
      return new Response(
        JSON.stringify({ success: false, error: 'Firecrawl API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    console.log('Scraping URL:', url)

    // Call Firecrawl API to scrape the content
    const firecrawlResponse = await fetch('https://api.firecrawl.dev/v0/scrape', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${firecrawlApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
        pageOptions: {
          onlyMainContent: true,
          includeHtml: extractImages,
          screenshot: false
        },
        extractorOptions: {
          mode: 'llm-extraction',
          extractionPrompt: 'Extract the main article content, title, and all image URLs from this page. Focus on the primary article text and any relevant images.'
        }
      })
    })

    if (!firecrawlResponse.ok) {
      const errorText = await firecrawlResponse.text()
      console.error('Firecrawl API error:', errorText)
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to scrape content' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const firecrawlData = await firecrawlResponse.json()
    console.log('Firecrawl response received')

    let images: string[] = []
    
    if (extractImages && firecrawlData.data?.html) {
      // Extract images from HTML
      const imgRegex = /<img[^>]+src\s*=\s*["']([^"']+)["'][^>]*>/gi
      const matches = [...firecrawlData.data.html.matchAll(imgRegex)]
      
      images = matches
        .map(match => match[1])
        .filter(src => {
          // Filter out small icons, ads, and tracking pixels
          return src && 
                 !src.includes('icon') && 
                 !src.includes('logo') && 
                 !src.includes('pixel') && 
                 !src.includes('tracker') &&
                 !src.includes('ad-') &&
                 !src.endsWith('.gif') &&
                 (src.startsWith('http') || src.startsWith('//'))
        })
        .map(src => src.startsWith('//') ? `https:${src}` : src)
        .slice(0, 5) // Limit to 5 images
    }

    const response: ScrapeResponse = {
      success: true,
      content: firecrawlData.data?.markdown || firecrawlData.data?.content || '',
      title: firecrawlData.data?.title || '',
      images: images
    }

    console.log(`Successfully scraped content. Found ${images.length} images.`)

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Error in scrape-article-content function:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
}

serve(handler)