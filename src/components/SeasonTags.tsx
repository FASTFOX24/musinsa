import React from "react";
import * as S from "@/styles/SeasonTags.styles";
import { type SeasonTagsProps } from "@/types/component";

const SeasonTags: React.FC<SeasonTagsProps> = ({ seasons, onSeasonChange }) => {
  return (
    <S.FormGroup>
      <S.Label>
        계절 태그 <S.Required>*</S.Required>
      </S.Label>
      <S.SeasonTagsContainer>
        <S.SeasonTag
          type="button"
          $active={seasons.spring}
          onClick={() => onSeasonChange("spring")}
        >
          봄
        </S.SeasonTag>
        <S.SeasonTag
          type="button"
          $active={seasons.summer}
          onClick={() => onSeasonChange("summer")}
        >
          여름
        </S.SeasonTag>
        <S.SeasonTag
          type="button"
          $active={seasons.autumn}
          onClick={() => onSeasonChange("autumn")}
        >
          가을
        </S.SeasonTag>
        <S.SeasonTag
          type="button"
          $active={seasons.winter}
          onClick={() => onSeasonChange("winter")}
        >
          겨울
        </S.SeasonTag>
      </S.SeasonTagsContainer>
    </S.FormGroup>
  );
};

export default SeasonTags;
