import styled from "styled-components";

export const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 1000;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  gap: 16px;

  @media (min-width: 768px) {
    padding: 0 20px;
  }

  @media (min-width: 1024px) {
    padding: 0 20px;
  }
`;

export const BackButton = styled.button`
  font-size: 24px;
  font-weight: 600;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);
  }
`;

export const Title = styled.h1`
  font-size: 18px;
  font-weight: 700;
  color: #000000;
  margin: 0;

  @media (min-width: 768px) {
    font-size: 20px;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  margin-right: 16px;
`;

export const NavButton = styled.button`
  font-size: 14px;
  font-weight: bold;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const LoginButton = styled.button`
  font-size: 14px;
  font-weight: 500;
  color: #ffffff;
  background-color: #000000;
  border: none;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    transform: scale(1.05);
  }
`;

export const ProfileImageWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;
