import { type CategoryKey } from "@/utils/category";

export type SeasonFlags = {
  spring: boolean;
  summer: boolean;
  autumn: boolean;
  winter: boolean;
};

export interface ItemFormData {
  name: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  category?: CategoryKey | "";
  seasons: SeasonFlags;
}

export interface ItemFormProps {
  initialData?: Partial<ItemFormData>;
  onSubmit: (data: ItemFormData) => void;
  onCancel: () => void;
  submitButtonText: string;
}

export interface ItemData {
  id: string;
  name?: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  category?: CategoryKey | "";
  seasons: SeasonFlags;
}

export type Item = {
  id: string;
  name?: string;
  brand: string;
  price: string;
  description: string;
  images: string[];
  seasons: SeasonFlags;
};
