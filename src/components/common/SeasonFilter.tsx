import React, { useState, useEffect, useRef } from "react";
import {
  DropdownContainer,
  DropdownButton,
  DropdownText,
  DropdownArrow,
  DropdownMenu,
  DropdownItem,
} from "@/styles/SeasonFilter.styles";

interface SeasonFilterProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

export const SeasonFilter: React.FC<SeasonFilterProps> = ({
  selectedSeason,
  onSeasonChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭 시 드랍다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSeasonFilter = (season: string) => {
    onSeasonChange(season);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getSeasonDisplayName = (season: string) => {
    const seasonNames = {
      all: "전체보기",
      spring: "봄",
      summer: "여름",
      autumn: "가을",
      winter: "겨울"
    };
    return seasonNames[season as keyof typeof seasonNames];
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown}>
        <DropdownText>{getSeasonDisplayName(selectedSeason)}</DropdownText>
        <DropdownArrow $isOpen={isDropdownOpen}>▼</DropdownArrow>
      </DropdownButton>
      {isDropdownOpen && (
        <DropdownMenu>
          <DropdownItem
            $isSelected={selectedSeason === "all"}
            onClick={() => handleSeasonFilter("all")}
          >
            전체보기
          </DropdownItem>
          <DropdownItem
            $isSelected={selectedSeason === "spring"}
            onClick={() => handleSeasonFilter("spring")}
          >
            봄
          </DropdownItem>
          <DropdownItem
            $isSelected={selectedSeason === "summer"}
            onClick={() => handleSeasonFilter("summer")}
          >
            여름
          </DropdownItem>
          <DropdownItem
            $isSelected={selectedSeason === "autumn"}
            onClick={() => handleSeasonFilter("autumn")}
          >
            가을
          </DropdownItem>
          <DropdownItem
            $isSelected={selectedSeason === "winter"}
            onClick={() => handleSeasonFilter("winter")}
          >
            겨울
          </DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

