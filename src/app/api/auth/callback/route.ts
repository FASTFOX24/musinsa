import { supabaseServerClient } from "@/lib/supabaseServerClient";
import { NextResponse } from "next/server";
import { defaultItems } from "@/lib/defaultItems";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirectTo = requestUrl.searchParams.get("redirect") || "/";

  if (code) {
    const supabase = await supabaseServerClient();
    await supabase.auth.exchangeCodeForSession(code);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user?.id) {
        const { count, error: countError } = await supabase
          .from("items")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);

        if (!countError && (count ?? 0) === 0) {
          const rows = defaultItems.map((item) => ({
            user_id: user.id,
            name: item.name,
            brand: item.brand,
            price: item.price,
            description: item.description,
            images: item.images,
            category: item.category,
            seasons: item.seasons,
          }));

          await supabase.from("items").insert(rows);
        }
      }
    } catch (e) {
      console.warn("초기 기본 아이템 삽입 중 경고:", e);
    }
  }

  return NextResponse.redirect(new URL(redirectTo, request.url));
}
