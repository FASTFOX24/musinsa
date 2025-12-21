"use client";

import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Header from "@/components/Header";
import * as S from "@/styles/ProfilePage.styles";

export default function ProfilePage() {
  const session = useSession();
  const user = session?.user;
  const router = useRouter();
  const supabase = supabaseBrowserClient();

  const handleGoBack = () => {
    router.back();
  };

  if (!user) {
    return (
      <S.Container>
        <Header />
        <S.MainContent>
          <S.ErrorMessage>로그인이 필요합니다.</S.ErrorMessage>
          <S.HomeButton onClick={handleGoBack}>뒤로가기</S.HomeButton>
        </S.MainContent>
      </S.Container>
    );
  }

  const userInfo = {
    이름:
      user.user_metadata?.full_name || user.user_metadata?.name || "정보 없음",
    이메일: user.email || "정보 없음",
    가입일: user.created_at
      ? new Date(user.created_at).toLocaleDateString("ko-KR")
      : "정보 없음",
    "사용자 ID": user.id || "정보 없음",
    프로바이더: user.app_metadata?.provider || "정보 없음",
    아바타: user.user_metadata?.avatar_url || null,
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        await supabase.auth.signOut();
        router.push("/");
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <S.Container>
      <Header />

      <S.MainContent>
        <S.ProfileContainer>
          <S.ProfileHeader>
            <S.AvatarContainer>
              {userInfo.아바타 ? (
                <S.Avatar src={userInfo.아바타} alt="프로필 이미지" />
              ) : (
                <S.DefaultAvatar>{userInfo.이름.charAt(0)}</S.DefaultAvatar>
              )}
            </S.AvatarContainer>
            <S.ProfileTitle>{userInfo.이름}님의 프로필</S.ProfileTitle>
          </S.ProfileHeader>

          <S.InfoGrid>
            <S.InfoItem>
              <S.InfoLabel>이름</S.InfoLabel>
              <S.InfoValue>{userInfo.이름}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>이메일</S.InfoLabel>
              <S.InfoValue>{userInfo.이메일}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>가입일</S.InfoLabel>
              <S.InfoValue>{userInfo.가입일}</S.InfoValue>
            </S.InfoItem>

            <S.InfoItem>
              <S.InfoLabel>로그인 방식</S.InfoLabel>
              <S.InfoValue>{userInfo.프로바이더}</S.InfoValue>
            </S.InfoItem>
          </S.InfoGrid>

          <S.ActionButtons>
            <S.ActionButton onClick={handleGoBack}>뒤로가기</S.ActionButton>
            <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
          </S.ActionButtons>
        </S.ProfileContainer>
      </S.MainContent>
    </S.Container>
  );
}
