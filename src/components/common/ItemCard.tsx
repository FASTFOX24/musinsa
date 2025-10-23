import React from "react";
import {
  CardContainer,
  ItemImage,
  ItemInfo,
  SeasonTags,
  SeasonTag,
} from "@/styles/ItemCard.styles";

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
  const activeSeasons = Object.entries(seasons)
    .filter(([_, isActive]) => isActive)
    .map(([season, _]) => {
      const seasonNames = { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" };
      return seasonNames[season as keyof typeof seasonNames];
    });

  return (
    <CardContainer onClick={() => onClick(id)}>
      <ItemImage src={images[0]} alt="아이템 이미지" />
      <ItemInfo>
        <SeasonTags>
          {activeSeasons.map((season) => (
            <SeasonTag key={season}>{season}</SeasonTag>
          ))}
        </SeasonTags>
      </ItemInfo>
    </CardContainer>
  );
};

