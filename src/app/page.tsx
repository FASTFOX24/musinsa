"use client";

import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ItemCard } from "@/components/common/ItemCard";
import { SeasonFilter } from "@/components/common/SeasonFilter";
import {
  Container,
  HeaderContainer,
  HeaderContent,
  Logo,
  NavContainer,
  ProfileButton,
  LoginButton,
  MainContent,
  TopSection,
  AddItemButton,
  PrimaryButton,
  ItemsGrid,
  EmptyState,
  EmptyTitle,
  EmptyDescription,
} from "@/styles/HomePage.styles";
import { useSession } from "@supabase/auth-helpers-react";

type SeasonFlags = {
  spring: boolean;
  summer: boolean;
  autumn: boolean;
  winter: boolean;
};

type Item = {
  id: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  seasons: SeasonFlags;
};

export default function Home() {
  const supabase = supabaseBrowserClient();
  const session = useSession();
  const user = session?.user;
  const [items, setItems] = useState<Item[]>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }

    const sampleItems = [
      {
        id: "1",
        brand: "나이키",
        price: "89,000",
        description: "편안한 착용감과 세련된 디자인의 운동화입니다.",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
        ],
        seasons: {
          spring: true,
          summer: true,
          autumn: true,
          winter: false,
        },
      },
      {
        id: "2",
        brand: "아디다스",
        price: "75,000",
        description: "클래식한 디자인의 스니커즈입니다.",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        ],
        seasons: {
          spring: true,
          summer: false,
          autumn: true,
          winter: true,
        },
      },
      {
        id: "3",
        brand: "컨버스",
        price: "65,000",
        description: "캐주얼한 스타일의 캔버스 신발입니다.",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop",
        ],
        seasons: {
          spring: true,
          summer: true,
          autumn: false,
          winter: false,
        },
      },
    ];

    setItems(sampleItems);
  }, [user]);

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
      return true; // 모든 아이템 표시
    }

    return item.seasons[selectedSeason as keyof typeof item.seasons];
  });

  return (
    <Container>
      <HeaderContainer>
        <HeaderContent>
          <Logo href="/">musinsa</Logo>
          <NavContainer>
            {user ? (
              <>
                <ProfileButton href="/profile">
                  {user.user_metadata?.full_name ||
                    user.email?.split("@")[0] ||
                    "사용자"}
                  의 프로필
                </ProfileButton>
                <LoginButton onClick={handleLogout}>로그아웃</LoginButton>
              </>
            ) : (
              <LoginButton onClick={handleGoogleLogin}>로그인</LoginButton>
            )}
          </NavContainer>
        </HeaderContent>
      </HeaderContainer>
      <MainContent>
        {filteredItems.length > 0 && (
          <TopSection>
            <SeasonFilter
              selectedSeason={selectedSeason}
              onSeasonChange={handleSeasonChange}
            />
            <AddItemButton onClick={handleAddItem}>아이템 추가</AddItemButton>
          </TopSection>
        )}

        {filteredItems.length === 0 ? (
          <EmptyState>
            <EmptyTitle>
              {!user || items.length === 0
                ? "아이템이 없습니다"
                : "필터에 맞는 아이템이 없습니다"}
            </EmptyTitle>
            <EmptyDescription>
              {!user || items.length === 0
                ? "아이템을 추가하여 목록을 채워보세요."
                : "다른 계절을 선택하거나 전체보기를 눌러보세요."}
            </EmptyDescription>
            <PrimaryButton onClick={handleAddItem}>
              첫 아이템 추가
            </PrimaryButton>
          </EmptyState>
        ) : (
          <ItemsGrid>
            {filteredItems.map((item) => (
              <ItemCard
                key={item.id}
                id={item.id}
                images={item.images}
                seasons={item.seasons}
                onClick={handleItemClick}
              />
            ))}
          </ItemsGrid>
        )}
      </MainContent>
    </Container>
  );
}
