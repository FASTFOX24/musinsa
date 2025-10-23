"use client";

import styled from "styled-components";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const supabase = supabaseBrowserClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();
  }, []);

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Container>
        <Header />
        <MainContent>
          <LoadingMessage>로딩중...</LoadingMessage>
        </MainContent>
      </Container>
    );
  }

  if (!user) {
    return (
      <Container>
        <Header />
        <MainContent>
          <ErrorMessage>로그인이 필요합니다.</ErrorMessage>
          <Link href="/">
            <HomeButton>홈으로 돌아가기</HomeButton>
          </Link>
        </MainContent>
      </Container>
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

  return (
    <Container>
      <Header />

      <MainContent>
        <ProfileContainer>
          <ProfileHeader>
            <AvatarContainer>
              {userInfo.아바타 ? (
                <Avatar src={userInfo.아바타} alt="프로필 이미지" />
              ) : (
                <DefaultAvatar>{userInfo.이름.charAt(0)}</DefaultAvatar>
              )}
            </AvatarContainer>
            <ProfileTitle>{userInfo.이름}님의 프로필</ProfileTitle>
          </ProfileHeader>

          <InfoGrid>
            <InfoItem>
              <InfoLabel>이름</InfoLabel>
              <InfoValue>{userInfo.이름}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>이메일</InfoLabel>
              <InfoValue>{userInfo.이메일}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>가입일</InfoLabel>
              <InfoValue>{userInfo.가입일}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>로그인 방식</InfoLabel>
              <InfoValue>{userInfo.프로바이더}</InfoValue>
            </InfoItem>
          </InfoGrid>

          <ActionButtons>
            <Link href="/">
              <ActionButton>홈으로 돌아가기</ActionButton>
            </Link>
          </ActionButtons>
        </ProfileContainer>
      </MainContent>
    </Container>
  );
}

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;


const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProfileContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const AvatarContainer = styled.div`
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const DefaultAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: #666666;
  margin: 0 auto;
`;

const ProfileTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 40px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`;

const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #666666;
`;

const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  text-align: right;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const ActionButton = styled.button`
  padding: 12px 24px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
`;

const HomeButton = styled.button`
  padding: 12px 24px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;
