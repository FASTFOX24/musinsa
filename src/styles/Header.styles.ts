import styled from "styled-components";
import Link from "next/link";

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
`;

export const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const NavButton = styled.button`
  font-size: 18px;
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
`;

export const Logo = styled(Link)`
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  text-decoration: none;
  letter-spacing: -0.5px;

  @media (min-width: 768px) {
    font-size: 24px;
  }

  &:hover {
    color: #333333;
  }
`;

export const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1001;

  @media (max-width: 767px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const HamburgerIcon = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 24px;
  height: 18px;
  position: relative;

  span {
    display: block;
    height: 2px;
    width: 100%;
    background-color: #000000;
    border-radius: 2px;
    transition: all 0.3s ease;
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg) translate(6px, 3px)" : "none"};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(-45deg) translate(6px, -3px)" : "none"};
    }
  }
`;

export const MobileMenu = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 60px;
    right: 0;
    width: 240px;
    height: calc(100vh - 60px);
    background-color: #ffffff;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(100%)"};
    transition: transform 0.3s ease;
    z-index: 1000;
    overflow-y: auto;
  }
`;

export const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

export const MobileNavButton = styled.button`
  width: 200px;
  font-size: 16px;
  font-weight: 600;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 20px 0px;
  border-radius: 8px;
  text-align: left;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }
`;

export const MobileLoginButton = styled.button`
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  color: #ffffff;
  background-color: #000000;
  border: none;
  cursor: pointer;
  padding: 12px 16px;
  margin-top: 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    background-color: #333333;
  }
`;

export const MobileMenuOverlay = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
`;
