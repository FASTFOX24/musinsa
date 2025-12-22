"use client";

import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ItemCard } from "@/components/common/ItemCard";
import Header from "@/components/Header";
import { SeasonFilter } from "@/components/common/SeasonFilter";
import * as S from "@/styles/HomePage.styles";
import { useSession } from "@supabase/auth-helpers-react";

type SeasonFlags = {
  spring: boolean;
  summer: boolean;
  autumn: boolean;
  winter: boolean;
};

type Item = {
  id: string;
  name?: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  seasons: SeasonFlags;
};

export default function ListPage() {
  const supabase = supabaseBrowserClient();
  const session = useSession();
  const user = session?.user;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      if (!user) {
        setItems([]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("items")
          .select("id, name, images, seasons")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        console.log("조회한 아이템 데이터 : ", data);
        setItems((data || []) as Item[]);
      } catch (err) {
        console.error("아이템 목록 로딩 실패:", err);
        setItems([]);
      }
    };

    fetchItems();
  }, [user, supabase]);

  const handleGoogleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          window.location.origin
        }/api/auth/callback?redirect=${encodeURIComponent(
          window.location.pathname
        )}`,
      },
    });

    if (error) {
      alert("로그인에 실패하였습니다. 다시 시도해주세요.");
      router.push("/");
    } else {
      console.log("리다이렉트 중...", data);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleAddItem = () => {
    if (!user) {
      const shouldLogin = confirm(
        "아이템을 추가하려면 로그인이 필요합니다.\n로그인하시겠습니까?"
      );
      if (shouldLogin) {
        handleGoogleLogin();
      }
      return;
    }
    router.push("/item/add");
  };

  const handleItemClick = (id: string) => {
    router.push(`/item/detail/${id}`);
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };

  const filteredItems = items.filter((item) => {
    if (selectedSeason === "all") {
      return true;
    }

    return item.seasons[selectedSeason as keyof typeof item.seasons];
  });

  return (
    <S.Container>
      <Header leftContentType="logo" />
      <S.MainContent>
        {user && items.length > 0 && (
          <S.TopSection>
            <SeasonFilter
              selectedSeason={selectedSeason}
              onSeasonChange={handleSeasonChange}
            />
            {filteredItems.length > 0 && (
              <S.AddItemButton onClick={handleAddItem}>
                아이템 추가
              </S.AddItemButton>
            )}
          </S.TopSection>
        )}

        {filteredItems.length === 0 ? (
          <S.EmptyState>
            <S.EmptyTitle>
              {!user || items.length === 0
                ? "아이템이 없습니다"
                : "필터에 맞는 아이템이 없습니다"}
            </S.EmptyTitle>
            <S.EmptyDescription>
              {!user || items.length === 0
                ? "아이템을 추가하여 목록을 채워보세요."
                : "다른 계절을 선택하거나 전체보기를 눌러보세요."}
            </S.EmptyDescription>
            <S.PrimaryButton onClick={handleAddItem}>
              첫 아이템 추가
            </S.PrimaryButton>
          </S.EmptyState>
        ) : (
          <S.ItemsGrid>
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                name={item.name}
                images={item.images}
                seasons={item.seasons}
                onClick={handleItemClick}
              />
            ))}
          </S.ItemsGrid>
        )}
      </S.MainContent>
    </S.Container>
  );
}
