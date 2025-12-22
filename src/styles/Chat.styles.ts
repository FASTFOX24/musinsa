import styled from "styled-components";
import Link from "next/link";

export const PageWrapper = styled.main`
  min-height: 100vh;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  padding-top: 61px;
  display: flex;
  justify-content: center;
  align-items: stretch;
  flex-direction: column;
  background: #ffffff;
  color: #000000;
`;

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

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 20px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 320px;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;

export const Message = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  gap: 4px;
`;

export const MessageText = styled.div<{ $isUser: boolean }>`
  max-width: 72%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  background-color: ${(props) => (props.$isUser ? "#f5f5f5" : "#f0f0f0")};
  color: #000000;
`;

export const MessageTime = styled.div`
  font-size: 11px;
  color: #000000;
  padding: 0 4px;
`;

export const LoadingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background-color: #f5f5f5;
  border-radius: 16px;
`;

export const LoadingDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #999999;
  animation: bounce 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }

  &:nth-child(2) {
    animation-delay: -0.16s;
  }

  @keyframes bounce {
    0%,
    80%,
    100% {
      transform: scale(0);
    }
    40% {
      transform: scale(1);
    }
  }
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  padding: 18px 20px;
  background-color: #ffffff;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 14px 18px;
  border: 2px solid #e5e5e5;
  border-radius: 28px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #111111;
  }

  &::placeholder {
    color: #999999;
  }
`;

export const SendButton = styled.button`
  padding: 12px 24px;
  background-color: #111111;
  color: #ffffff;
  border: none;
  border-radius: 24px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background-color: #222222;
  }

  &:disabled {
    background-color: #d5d5d5;
    cursor: not-allowed;
  }
`;

export const RecommendedItemsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 12px;
  flex-wrap: wrap;
  max-width: 100%;
`;

export const RecommendedItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, opacity 0.2s ease;
  width: 100px;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.8;
  }
`;

export const RecommendedItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
`;

export const RecommendedItemPlaceholder = styled.div`
  width: 100px;
  height: 100px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  color: #999999;
  border: 1px solid #e5e5e5;
`;

export const RecommendedItemName = styled.div`
  font-size: 12px;
  color: #666666;
  text-align: center;
  word-break: break-word;
  max-width: 100px;
`;
