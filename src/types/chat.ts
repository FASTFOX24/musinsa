import { type SeasonFlags } from "@/types/item";

export interface RecommendedItem {
  id: string;
  name: string;
  images: string[];
}

export interface FormattedItemForChat {
  id: string;
  name: string;
  seasons: SeasonFlags;
  description: string;
  category: string;
}

export interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  recommendedItems?: RecommendedItem[];
}
