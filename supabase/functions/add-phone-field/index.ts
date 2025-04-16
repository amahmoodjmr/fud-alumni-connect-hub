
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    // Check if column already exists
    const { data: columnExists, error: checkError } = await supabaseAdmin.rpc('column_exists', { 
      table_name: 'profiles',
      column_name: 'phone'
    });

    if (checkError) {
      // If the function doesn't exist, create it first
      await supabaseAdmin.rpc(`
        CREATE OR REPLACE FUNCTION column_exists(table_name text, column_name text) 
        RETURNS boolean AS $$
        DECLARE
          exists boolean;
        BEGIN
          SELECT count(*) > 0 INTO exists
          FROM information_schema.columns
          WHERE table_schema = 'public'
          AND table_name = $1
          AND column_name = $2;
          
          RETURN exists;
        END;
        $$ LANGUAGE plpgsql;
      `);
      
      // Try the check again
      const { data, error } = await supabaseAdmin.rpc('column_exists', { 
        table_name: 'profiles',
        column_name: 'phone'
      });
      
      if (error) throw error;
      if (data) return new Response(JSON.stringify({ success: true, message: "Column 'phone' already exists" }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      });
    }

    // If column doesn't exist, add it
    if (!columnExists) {
      const { error: alterError } = await supabaseAdmin.rpc(`
        ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
      `);

      if (alterError) throw alterError;
      
      return new Response(JSON.stringify({ success: true, message: "Column 'phone' added to profiles table" }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      });
    } else {
      return new Response(JSON.stringify({ success: true, message: "Column 'phone' already exists" }), { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }, 
        status: 200 
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), { 
      headers: { ...corsHeaders, "Content-Type": "application/json" }, 
      status: 500 
    });
  }
});
