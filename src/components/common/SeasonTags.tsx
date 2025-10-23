import React from "react";
import {
  FormGroup,
  Label,
  Required,
  SeasonTagsContainer,
  SeasonTag,
} from "@/styles/SeasonTags.styles";

interface SeasonTagsProps {
  seasons: {
    spring: boolean;
    summer: boolean;
    autumn: boolean;
    winter: boolean;
  };
  onSeasonChange: (season: keyof SeasonTagsProps['seasons']) => void;
}

export const SeasonTags: React.FC<SeasonTagsProps> = ({
  seasons,
  onSeasonChange,
}) => {
  return (
    <FormGroup>
      <Label>
        계절 태그 <Required>*</Required>
      </Label>
      <SeasonTagsContainer>
        <SeasonTag
          type="button"
          $active={seasons.spring}
          onClick={() => onSeasonChange("spring")}
        >
          봄
        </SeasonTag>
        <SeasonTag
          type="button"
          $active={seasons.summer}
          onClick={() => onSeasonChange("summer")}
        >
          여름
        </SeasonTag>
        <SeasonTag
          type="button"
          $active={seasons.autumn}
          onClick={() => onSeasonChange("autumn")}
        >
          가을
        </SeasonTag>
        <SeasonTag
          type="button"
          $active={seasons.winter}
          onClick={() => onSeasonChange("winter")}
        >
          겨울
        </SeasonTag>
      </SeasonTagsContainer>
    </FormGroup>
  );
};

