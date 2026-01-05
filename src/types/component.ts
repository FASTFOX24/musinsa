import { type SeasonFlags } from "./item";

export interface ItemCardProps {
  id: string;
  name?: string;
  images: string[];
  seasons: SeasonFlags;
  onClick: (id: string) => void;
}

export interface ImageUploadProps {
  images: string[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

export interface SeasonTagsProps {
  seasons: SeasonFlags;
  onSeasonChange: (season: keyof SeasonFlags) => void;
}

export interface SeasonFilterProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

export interface HeaderProps {
  title?: string;
  leftContentType?: "logo" | "back";
}
