export type CategoryKey = "outer" | "top" | "bottom" | "shoes" | "accessory";

export const categoryDisplayNameMap: Record<CategoryKey, string> = {
  outer: "아우터",
  top: "상의",
  bottom: "하의",
  shoes: "신발",
  accessory: "악세서리",
};

export const categoryKeys: CategoryKey[] = ["outer", "top", "bottom", "shoes", "accessory"];

export function getCategoryDisplayName(category: string): string {
  return categoryDisplayNameMap[category as CategoryKey] ?? category;
}

