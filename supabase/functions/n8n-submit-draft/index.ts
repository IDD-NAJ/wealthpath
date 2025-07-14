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

    // Simple success response for testing
    console.log("=== RETURNING SUCCESS ===");
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Function is working",
        receivedData: {
          title: requestBody.original_title || "No title",
          hasContent: !!requestBody.original_content,
          contentLength: requestBody.original_content?.length || 0
        }
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

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