"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@supabase/auth-helpers-react";
import { fetchCurrentWeather } from "@/utils/weatherApi";
import type { WeatherItem } from "@/types/weather";
import { supabaseBrowserClient } from "@/lib/supabaseBrowserClient";
import Header from "@/components/Header";
import * as S from "@/styles/Chat.styles";
import type { ChatMessage } from "@/types/chat";

export default function Home() {
  const session = useSession();
  const user = session?.user;
  const router = useRouter();
  const supabase = supabaseBrowserClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherItem[] | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    // 1) 유저별 로컬스토리지에서 기존 채팅 불러오기
    const storageKey =
      typeof window !== "undefined" && user?.id
        ? `style-chat-messages:${user.id}`
        : null;

    if (storageKey) {
      const stored = window.localStorage.getItem(storageKey);

      if (stored) {
        try {
          const parsed = JSON.parse(stored) as Array<
            Omit<ChatMessage, "timestamp"> & { timestamp: string }
          >;
          const restored: ChatMessage[] = parsed.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.timestamp),
          }));
          if (restored.length > 0) {
            setMessages(restored);
          } else {
            setMessages([
              {
                text: "오늘의 날씨와 가지고 있는 옷을 기반으로, GPT가 코디를 함께 고민해줍니다.",
                sender: "bot",
                timestamp: new Date(),
              },
            ]);
          }
        } catch (e) {
          console.error("저장된 채팅 불러오기 실패:", e);
          setMessages([
            {
              text: "오늘의 날씨와 가지고 있는 옷을 기반으로, GPT가 코디를 함께 고민해줍니다.",
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
        }
      } else {
        setMessages([
          {
            text: "오늘의 날씨와 가지고 있는 옷을 기반으로, GPT가 코디를 함께 고민해줍니다.",
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
    } else {
      // 로그인하지 않았거나 user.id가 없으면 항상 기본 메시지
      setMessages([
        {
          text: "오늘의 날씨와 가지고 있는 옷을 기반으로, GPT가 코디를 함께 고민해줍니다.",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    }

    // 2) 날씨 정보 로딩
    const loadWeather = async () => {
      try {
        const weather = await fetchCurrentWeather();
        setWeatherData(weather);
      } catch (error) {
        console.error("날씨 정보 가져오기 실패:", error);
      }
    };

    loadWeather();
  }, [user?.id]);

  // 메시지 변경 시 로컬스토리지에 저장
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (messages.length === 0) return;
    if (!user?.id) return;

    const storageKey = `style-chat-messages:${user.id}`;

    const serialized = messages.map((msg) => ({
      ...msg,
      timestamp: msg.timestamp.toISOString(),
    }));

    window.localStorage.setItem(storageKey, JSON.stringify(serialized));
  }, [messages, user?.id]);

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
      router.push("/");
    } else {
      console.log("리다이렉트 중...", data);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (response.ok) {
        await supabase.auth.signOut();
      }
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      text: inputValue.trim(),
      sender: "user" as const,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/fashion-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          message: userMessage.text,
          weatherData: weatherData || null,
        }),
      });

      const data = await res.json();

      const botMessage = {
        text: data.reply,
        sender: "bot" as const,
        timestamp: new Date(),
        recommendedItems: data.recommendedItems || [],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          text: "⚠️ 응답을 가져오는데 실패했습니다. 다시 시도해주세요!",
          sender: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.PageWrapper>
      <Header leftContentType="logo" />
      <S.MessagesContainer>
        {messages.map((message, index) => {
          const isUser = message.sender === "user";
          return (
            <S.Message key={index} $isUser={isUser}>
              <S.MessageText $isUser={isUser}>{message.text}</S.MessageText>
              {message.recommendedItems &&
                message.recommendedItems.length > 0 && (
                  <S.RecommendedItemsContainer>
                    {message.recommendedItems.map((item) => (
                      <S.RecommendedItem
                        key={item.id}
                        onClick={() => {
                          router.push(`/item/detail/${item.id}`);
                        }}
                      >
                        {item.images && item.images.length > 0 ? (
                          <S.RecommendedItemImage
                            src={item.images[0]}
                            alt={item.name}
                          />
                        ) : (
                          <S.RecommendedItemPlaceholder>
                            이미지 없음
                          </S.RecommendedItemPlaceholder>
                        )}
                      </S.RecommendedItem>
                    ))}
                  </S.RecommendedItemsContainer>
                )}
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
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="오늘 입고 싶은 스타일이나 상황을 알려주세요..."
        />
        <S.SendButton
          onClick={handleSend}
          disabled={!inputValue.trim() || isLoading}
        >
          전송
        </S.SendButton>
      </S.InputContainer>
    </S.PageWrapper>
  );
}
