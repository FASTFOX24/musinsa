"use client";

import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { User } from "@supabase/supabase-js";
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

export default function Home() {
  const supabase = supabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<Array<{
    id: string;
    brand: string;
    price: string;
    description: string;
    images: string[];
    seasons: {
      spring: boolean;
      summer: boolean;
      autumn: boolean;
      winter: boolean;
    };
  }>>([]);
  const [selectedSeason, setSelectedSeason] = useState<string>("all");
  const nextIdRef = useRef<number>(1);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // 샘플 데이터 로드 (로그인한 사용자만)
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
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop"
        ],
        seasons: {
          spring: true,
          summer: true,
          autumn: true,
          winter: false
        }
      },
      {
        id: "2",
        brand: "아디다스",
        price: "75,000",
        description: "클래식한 디자인의 스니커즈입니다.",
        images: [
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
        ],
        seasons: {
          spring: true,
          summer: false,
          autumn: true,
          winter: true
        }
      },
      {
        id: "3",
        brand: "컨버스",
        price: "65,000",
        description: "캐주얼한 스타일의 캔버스 신발입니다.",
        images: [
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=400&fit=crop",
          "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"
        ],
        seasons: {
          spring: true,
          summer: true,
          autumn: false,
          winter: false
        }
      }
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
        setUser(null);
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleAddItem = () => {
    if (!user) {
      const shouldLogin = confirm("아이템을 추가하려면 로그인이 필요합니다.\n로그인하시겠습니까?");
      if (shouldLogin) {
        handleGoogleLogin();
      }
      return;
    }
    router.push('/item/add');
  };

  const handleItemClick = (id: string) => {
    router.push(`/item/detail/${id}`);
  };

  const handleSeasonChange = (season: string) => {
    setSelectedSeason(season);
  };

  // 필터링된 아이템 계산
  const filteredItems = items.filter((item) => {
    if (selectedSeason === "all") {
      return true; // 모든 아이템 표시
    }
    
    return item.seasons[selectedSeason as keyof typeof item.seasons];
  });

  return (
    <Container>
      {/* Header */}
      <HeaderContainer>
        <HeaderContent>
          {/* Logo */}
          <Logo href="/">musinsa</Logo>

          {/* Navigation */}
          <NavContainer>
            {loading ? (
              <LoginButton disabled>로딩중...</LoginButton>
            ) : user ? (
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

      {/* Main Content */}
      <MainContent>
        {/* Filter and Add Button - only show when there are items */}
        {filteredItems.length > 0 && (
          <TopSection>
            <SeasonFilter
              selectedSeason={selectedSeason}
              onSeasonChange={handleSeasonChange}
            />
            <AddItemButton onClick={handleAddItem}>
              아이템 추가
            </AddItemButton>
          </TopSection>
        )}

        {filteredItems.length === 0 ? (
          <EmptyState>
            <EmptyTitle>
              {!user ? '아이템이 없습니다' : 
               items.length === 0 ? '아이템이 없습니다' : '필터에 맞는 아이템이 없습니다'}
            </EmptyTitle>
            <EmptyDescription>
              {!user 
                ? '아이템을 추가하여 목록을 채워보세요.'
                : items.length === 0 
                  ? '아이템을 추가하여 목록을 채워보세요.'
                  : '다른 계절을 선택하거나 전체보기를 눌러보세요.'
              }
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

