import styled from "styled-components";
import Link from "next/link";

export const Container = styled.div`
  background-color: #ffffff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// 홈 헤더는 공용 Header 컴포넌트로 대체되었습니다.

export const Logo = styled(Link)`
  font-size: 24px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  letter-spacing: -0.5px;

  @media (min-width: 1024px) {
    font-size: 28px;
  }

  &:hover {
    color: #333333;
  }
`;

export const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (min-width: 1024px) {
    gap: 20px;
  }
`;

export const ProfileButton = styled(Link)`
  font-size: 12px;
  font-weight: 500;
  color: #666666;
  text-decoration: none;
  padding: 6px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.2s ease;

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (min-width: 1024px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
    color: #000000;
  }
`;

export const LoginButton = styled.button`
  font-size: 12px;
  font-weight: 500;
  color: #000000;
  text-decoration: none;
  padding: 6px 12px;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  background-color: #ffffff;
  transition: all 0.2s ease;

  @media (min-width: 768px) and (max-width: 1023px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (min-width: 1024px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  &:hover {
    background-color: #f8f8f8;
    border-color: #d5d5d5;
  }
`;

export const MainContent = styled.main`
  margin: 0 auto;
  padding: 20px 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 1200px;
  height: 100%;
  margin-top: 60px;
  @media (max-width: 767px) {
    width: 100%;
    padding: 20px 16px;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    padding: 30px 20px;
  }
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
  }
`;

export const AddItemButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #111111;
  transition: background-color 0.2s ease;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #222222;
  }

  @media (min-width: 1024px) {
    padding: 14px 24px;
    font-size: 15px;
  }
`;

export const PrimaryButton = styled.button`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  background-color: #111111;
  transition: background-color 0.2s ease;
  width: 100%;

  @media (min-width: 768px) and (max-width: 1023px) {
    width: auto;
    padding: 10px 16px;
  }

  @media (min-width: 1024px) {
    width: auto;
    padding: 10px 16px;
  }

  &:hover {
    background-color: #222222;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 12px;

  @media (min-width: 768px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px dashed #d5d5d5;
  border-radius: 8px;
  padding: 30px 16px;
  text-align: center;
  background-color: #fafafa;
  flex: 1;
  @media (min-width: 1024px) {
    padding: 40px 20px;
  }
`;

export const EmptyTitle = styled.h2`
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 700;
  color: #333333;

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

export const EmptyDescription = styled.p`
  margin: 0 0 16px 0;
  font-size: 13px;
  color: #666666;

  @media (min-width: 1024px) {
    font-size: 14px;
  }
`;

export const FloatingButton = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #111111;
  color: #ffffff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  z-index: 999;

  &:hover {
    background-color: #222222;
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 767px) {
    bottom: 20px;
    right: 20px;
    width: 52px;
    height: 52px;
    font-size: 22px;
  }
`;
