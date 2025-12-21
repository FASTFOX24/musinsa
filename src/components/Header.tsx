"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Image from "next/image";
import * as S from "@/styles/Header.styles";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function Header({
  title,
  showBackButton = true,
  leftContent,
  rightContent,
}: HeaderProps) {
  const router = useRouter();
  const session = useSession();
  const user = session?.user;
  const supabase = supabaseBrowserClient();

  const handleGoBack = () => {
    router.back();
  };

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
    } else {
      console.log("리다이렉트 중...", data);
    }
  };

  const handleProfileClick = () => {
    router.push("/profile");
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        {leftContent ? (
          leftContent
        ) : (
          <>
            {showBackButton && (
              <S.BackButton onClick={handleGoBack}>&lt;</S.BackButton>
            )}
            {title && <S.Title>{title}</S.Title>}
          </>
        )}
        <S.NavContainer>
          <S.NavButton onClick={() => router.push("/")}>채팅</S.NavButton>
          <S.NavButton onClick={() => router.push("/list")}>내 옷장</S.NavButton>
        </S.NavContainer>
        <S.RightActions>
          {rightContent ? (
            rightContent
          ) : (
            <>
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
                <S.LoginButton onClick={handleGoogleLogin}>
                  로그인
                </S.LoginButton>
              )}
            </>
          )}
        </S.RightActions>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}
