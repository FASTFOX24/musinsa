export type SeasonKey = "spring" | "summer" | "autumn" | "winter";

export const seasonDisplayNameMap: Record<string, string> = {
  all: "전체보기",
  spring: "봄",
  summer: "여름",
  autumn: "가을",
  winter: "겨울",
};

export function getSeasonDisplayName(season: string): string {
  return seasonDisplayNameMap[season] ?? season;
}

export function getActiveSeasonNames(
  seasons: Record<SeasonKey, boolean>
): string[] {
  return Object.entries(seasons)
    .filter(([_, isActive]) => Boolean(isActive))
    .map(([season]) => getSeasonDisplayName(season));
}


