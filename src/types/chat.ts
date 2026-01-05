export interface RecommendedItem {
  id: string;
  name: string;
  images: string[];
}

export interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  recommendedItems?: RecommendedItem[];
}
