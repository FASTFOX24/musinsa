"use client";

import { useRouter } from "next/navigation";
import {
  HeaderContainer,
  HeaderContent,
  BackButton,
  Title,
} from "@/styles/Header.styles";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
}

export default function Header({ title, showBackButton = true }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {showBackButton && (
          <BackButton onClick={handleGoBack}>
            &lt;
          </BackButton>
        )}
        {title && <Title>{title}</Title>}
      </HeaderContent>
    </HeaderContainer>
  );
}

