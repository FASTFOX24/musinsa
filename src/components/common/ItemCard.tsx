import React from "react";
import { getActiveSeasonNames } from "@/utils/season";
import * as S from "@/styles/ItemCard.styles";

interface ItemCardProps {
  id: string;
  images: string[];
  seasons: {
    spring: boolean;
    summer: boolean;
    autumn: boolean;
    winter: boolean;
  };
  onClick: (id: string) => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  images,
  seasons,
  onClick,
}) => {
  const activeSeasons = getActiveSeasonNames(seasons as any);

  return (
    <S.CardContainer onClick={() => onClick(id)}>
      <S.ItemImage src={images[0]} alt="아이템 이미지" />
      <S.ItemInfo>
        <S.SeasonTags>
          {activeSeasons.map((season) => (
            <S.SeasonTag key={season}>{season}</S.SeasonTag>
          ))}
        </S.SeasonTags>
      </S.ItemInfo>
    </S.CardContainer>
  );
};
