import React, { useState, useEffect, useRef } from "react";
import { getSeasonDisplayName } from "@/utils/season";
import * as S from "@/styles/SeasonFilter.styles";
import { type SeasonFilterProps } from "@/types/component";

const SeasonFilter: React.FC<SeasonFilterProps> = ({
  selectedSeason,
  onSeasonChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSeasonFilter = (season: string) => {
    onSeasonChange(season);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const display = (season: string) => getSeasonDisplayName(season);

  return (
    <S.DropdownContainer ref={dropdownRef}>
      <S.DropdownButton onClick={toggleDropdown}>
        <S.DropdownText>{display(selectedSeason)}</S.DropdownText>
        <S.DropdownArrow $isOpen={isDropdownOpen}>▼</S.DropdownArrow>
      </S.DropdownButton>
      {isDropdownOpen && (
        <S.DropdownMenu>
          <S.DropdownItem
            $isSelected={selectedSeason === "all"}
            onClick={() => handleSeasonFilter("all")}
          >
            전체보기
          </S.DropdownItem>
          <S.DropdownItem
            $isSelected={selectedSeason === "spring"}
            onClick={() => handleSeasonFilter("spring")}
          >
            봄
          </S.DropdownItem>
          <S.DropdownItem
            $isSelected={selectedSeason === "summer"}
            onClick={() => handleSeasonFilter("summer")}
          >
            여름
          </S.DropdownItem>
          <S.DropdownItem
            $isSelected={selectedSeason === "autumn"}
            onClick={() => handleSeasonFilter("autumn")}
          >
            가을
          </S.DropdownItem>
          <S.DropdownItem
            $isSelected={selectedSeason === "winter"}
            onClick={() => handleSeasonFilter("winter")}
          >
            겨울
          </S.DropdownItem>
        </S.DropdownMenu>
      )}
    </S.DropdownContainer>
  );
};

export default SeasonFilter;
