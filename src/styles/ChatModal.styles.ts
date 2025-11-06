import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-end;
  }
`;

export const ModalContainer = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    max-width: 100%;
    max-height: 90vh;
    border-radius: 16px 16px 0 0;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #333333;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 28px;
  color: #666666;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
    color: #333333;
  }
`;

export const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 300px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background: #d5d5d5;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #b5b5b5;
  }
`;

export const Message = styled.div<{ $isUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
  gap: 4px;
`;

export const MessageText = styled.div<{ $isUser: boolean }>`
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 16px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  background-color: ${(props) => (props.$isUser ? "#111111" : "#f5f5f5")};
  color: ${(props) => (props.$isUser ? "#ffffff" : "#333333")};
`;

export const MessageTime = styled.div`
  font-size: 11px;
  color: #999999;
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
  padding: 16px 20px;
  border-top: 1px solid #e5e5e5;
  background-color: #ffffff;
`;

export const MessageInput = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid #e5e5e5;
  border-radius: 24px;
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
