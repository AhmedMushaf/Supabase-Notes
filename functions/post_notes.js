// Why: POST is used for creating resources; reading input from body is standard for POST requests.

import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  const { title, content } = await req.json();
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    { global: { headers: { Authorization: req.headers.get("Authorization")! } } }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("notes")
    .insert([{ title, content, user_id: user.id }])
    .select();

  if (error) return new Response(JSON.stringify({ error }), { status: 500 });

  return new Response(JSON.stringify(data[0]), {
    headers: { "Content-Type": "application/json" },
  });
});
