import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 100px 20px 40px 20px;
`;

export const ProfileContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

export const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const AvatarContainer = styled.div`
  margin-bottom: 20px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const DefaultAvatar = styled.div`
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

export const ProfileTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #000000;
  margin: 0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 40px;
`;

export const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`;

export const InfoLabel = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #666666;
`;

export const InfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #000000;
  text-align: right;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

export const ActionButton = styled.button`
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

export const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
`;

export const HomeButton = styled.button`
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

