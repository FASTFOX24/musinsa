import { NextResponse } from "next/server";
import { convertLatLonToGrid } from "@/utils/coordinate";
import type { WeatherResponse } from "@/types/weather";

const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const getBaseDateTime = () => {
  const now = new Date();
  if (now.getMinutes() < 30) {
    now.setHours(now.getHours() - 1);
  }

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");

  return {
    baseDate: `${year}${month}${date}`,
    baseTime: `${hour}00`,
  };
};

async function fetchWeatherWithRetry(url: string, retries = 2) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
    });

    const contentType = response.headers.get("content-type") || "";

    if (response.ok && contentType.includes("application/json")) {
      return response.json();
    }

    // 503 / 429 → 잠깐 쉬고 재시도
    if ((response.status === 503 || response.status === 429) && attempt < retries) {
      await sleep(300);
      continue;
    }

    // 최종 실패
    const text = await response.text();
    throw new Error(
      `Weather API Error ${response.status}: ${text.slice(0, 100)}`
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    let gridX = 60;
    let gridY = 127;

    if (lat && lon) {
      const grid = convertLatLonToGrid(+lat, +lon);
      gridX = grid.nx;
      gridY = grid.ny;
    }

    const { baseDate, baseTime } = getBaseDateTime();

    const params = new URLSearchParams({
      serviceKey: process.env.WEATHER_API_KEY!, // 인코딩된 키여야 함
      pageNo: "1",
      numOfRows: "10",
      dataType: "JSON",
      base_date: baseDate,
      base_time: baseTime,
      nx: String(gridX),
      ny: String(gridY),
    });

    const url =
      `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?${params}`;

    const data: WeatherResponse = await fetchWeatherWithRetry(url);

    if (data.response.header.resultCode !== "00") {
      throw new Error(
        `API 오류: ${data.response.header.resultMsg}`
      );
    }

    return NextResponse.json({
      success: true,
      data: data.response.body.items.item ?? [],
    });
  } catch (error) {
    console.error("날씨 데이터 조회 실패:", error);

    // ❗ 여기서 500을 주지 않아도 됨 (추천)
    return NextResponse.json({
      success: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : "날씨 데이터를 가져오지 못했습니다.",
    });
  }
}