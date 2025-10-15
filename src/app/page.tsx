"use client";

import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Home() {
  const supabase = supabaseBrowserClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
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
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || '사용자'}의 프로필
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
        <Title>여기는 메인페이지</Title>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
`;

const Logo = styled(Link)`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  letter-spacing: -0.5px;

  &:hover {
    color: #333333;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ProfileButton = styled(Link)`
  font-size: 14px;
  font-weight: 500;
  color: #666666;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
    color: #000000;
  }
`;

const LoginButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;
