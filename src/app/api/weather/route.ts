import { NextResponse } from "next/server";
import { convertLatLonToGrid } from "@/utils/coordinate";
import type { WeatherResponse } from "@/types/weather";

const getBaseDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const date = String(now.getDate()).padStart(2, "0");
  const hour = String(now.getHours()).padStart(2, "0");

  return {
    baseDate: `${year}${month}${date}`,
    baseTime: `${hour}00`,
  };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    let gridX: number;
    let gridY: number;

    if (lat && lon) {
      const grid = convertLatLonToGrid(parseFloat(lat), parseFloat(lon));
      gridX = grid.nx;
      gridY = grid.ny;
    } else {
      gridX = 60;
      gridY = 127;
    }

    const { baseDate, baseTime } = getBaseDateTime();

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`;

    const params = new URLSearchParams({
      serviceKey: process.env.WEATHER_API_KEY!,
      pageNo: "1",
      numOfRows: "10",
      dataType: "JSON",
      base_date: baseDate,
      base_time: baseTime,
      nx: String(gridX),
      ny: String(gridY),
    });

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: WeatherResponse = await response.json();

    if (data.response.header.resultCode !== "00") {
      throw new Error(
        `API 오류: ${data.response.header.resultMsg} (코드: ${data.response.header.resultCode})`
      );
    }

    const items = data.response.body.items.item || [];

    return NextResponse.json({
      success: true,
      data: items,
    });
  } catch (error) {
    console.error("날씨 데이터 조회 실패:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "날씨 데이터를 가져오는데 실패했습니다.",
      },
      { status: 500 }
    );
  }
}
