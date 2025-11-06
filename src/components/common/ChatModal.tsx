"use client";

import React, { useState, useRef, useEffect } from "react";
import * as S from "../../styles/ChatModal.styles";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: "user" | "bot"; timestamp: Date }>
  >([
    {
      text: "안녕하세요! 무엇을 도와드릴까요?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      text: inputValue.trim(),
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // 3초 후 봇 응답
    setTimeout(() => {
      const botMessage = {
        text: "감사합니다. 더 자세한 내용을 알려주시면 더 도움을 드릴 수 있습니다.",
        sender: "bot" as const,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 3000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContainer onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <S.ModalHeader>
          <S.ModalTitle>채팅</S.ModalTitle>
          <S.CloseButton onClick={onClose}>×</S.CloseButton>
        </S.ModalHeader>
        <S.MessagesContainer>
          {messages.map((message, index) => {
            const isUser = message.sender === "user";
            return (
              <S.Message key={index} $isUser={isUser}>
                <S.MessageText $isUser={isUser}>{message.text}</S.MessageText>
                <S.MessageTime>
                  {message.timestamp.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </S.MessageTime>
              </S.Message>
            );
          })}
          {isLoading && (
            <S.Message $isUser={false}>
              <S.LoadingIndicator>
                <S.LoadingDot />
                <S.LoadingDot />
                <S.LoadingDot />
              </S.LoadingIndicator>
            </S.Message>
          )}
          <div ref={messagesEndRef} />
        </S.MessagesContainer>
        <S.InputContainer>
          <S.MessageInput
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            onKeyPress={handleKeyPress}
            placeholder="메시지를 입력하세요..."
          />
          <S.SendButton
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
          >
            전송
          </S.SendButton>
        </S.InputContainer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};
