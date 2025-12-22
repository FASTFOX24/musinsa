"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Image from "next/image";
import * as S from "@/styles/Header.styles";

interface HeaderProps {
  title?: string;
  leftContentType?: "logo" | "back";
}

export default function Header({ title, leftContentType }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const session = useSession();
  const user = session?.user;
  const supabase = supabaseBrowserClient();

  const handleGoogleLogin = async () => {
    setIsMobileMenuOpen(false);
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
    } else {
      console.log("리다이렉트 중...", data);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        {leftContentType === "logo" ? (
          <S.Logo href="/">Musinsa-Bay</S.Logo>
        ) : leftContentType === "back" ? (
          <>
            <S.BackButton onClick={() => router.push("/list")}>
              &lt;
            </S.BackButton>
            {title && <S.Title>{title}</S.Title>}
          </>
        ) : null}
        <S.NavContainer>
          <S.NavButton onClick={() => handleNavClick("/")}>채팅</S.NavButton>
          <S.NavButton onClick={() => handleNavClick("/list")}>
            내 옷장
          </S.NavButton>
        </S.NavContainer>
        <S.RightActions>
          {user ? (
            <S.ProfileButton onClick={handleProfileClick}>
              <S.ProfileImageWrapper>
                <Image
                  src="/profile-icon.png"
                  alt="프로필"
                  width={24}
                  height={24}
                />
              </S.ProfileImageWrapper>
            </S.ProfileButton>
          ) : (
            <S.LoginButton onClick={handleGoogleLogin}>로그인</S.LoginButton>
          )}
        </S.RightActions>
        <S.HamburgerButton onClick={handleMobileMenuToggle}>
          <S.HamburgerIcon $isOpen={isMobileMenuOpen}>
            <span></span>
            <span></span>
            <span></span>
          </S.HamburgerIcon>
        </S.HamburgerButton>
      </S.HeaderContent>
      <S.MobileMenu $isOpen={isMobileMenuOpen}>
        <S.MobileMenuContent>
          {user ? (
            <S.MobileLoginButton onClick={() => handleNavClick("/profile")}>
              프로필
            </S.MobileLoginButton>
          ) : (
            <S.MobileLoginButton onClick={handleGoogleLogin}>
              로그인
            </S.MobileLoginButton>
          )}
          <S.MobileNavButton onClick={() => handleNavClick("/")}>
            채팅
          </S.MobileNavButton>
          <S.MobileNavButton onClick={() => handleNavClick("/list")}>
            내 옷장
          </S.MobileNavButton>
        </S.MobileMenuContent>
      </S.MobileMenu>
      {isMobileMenuOpen && (
        <S.MobileMenuOverlay onClick={handleMobileMenuToggle} />
      )}
    </S.HeaderContainer>
  );
}
