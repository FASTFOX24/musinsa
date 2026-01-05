import React from "react";
import { getActiveSeasonNames } from "@/utils/season";
import * as S from "@/styles/ItemCard.styles";
import { type ItemCardProps } from "@/types/component";

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  images,
  seasons,
  onClick,
}) => {
  const activeSeasons = getActiveSeasonNames(seasons);

  return (
    <S.CardContainer onClick={() => onClick(id)}>
      <S.ItemImage src={images[0]} alt="아이템 이미지" />
      <S.ItemInfo>
        {name && <S.ItemName>{name}</S.ItemName>}
        <S.SeasonTags>
          {activeSeasons.map((season) => (
            <S.SeasonTag key={season}>{season}</S.SeasonTag>
          ))}
        </S.SeasonTags>
      </S.ItemInfo>
    </S.CardContainer>
  );
};

export default ItemCard;
