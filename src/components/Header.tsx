"use client";

import { useRouter } from "next/navigation";
import * as S from "@/styles/Header.styles";

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export default function Header({ title, showBackButton = true, leftContent, rightContent }: HeaderProps) {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        {leftContent ? (
          leftContent
        ) : (
          <>
            {showBackButton && (
              <S.BackButton onClick={handleGoBack}>
                &lt;
              </S.BackButton>
            )}
            {title && <S.Title>{title}</S.Title>}
          </>
        )}
        <S.RightActions>
          {rightContent}
        </S.RightActions>
      </S.HeaderContent>
    </S.HeaderContainer>
  );
}

