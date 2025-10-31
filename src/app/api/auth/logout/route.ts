import { NextResponse } from "next/server";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

export async function POST() {
  const supabase = await supabaseServerClient();
  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}