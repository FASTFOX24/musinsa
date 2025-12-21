import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { WeatherItem } from "@/types/weather";
import { supabaseServerClient } from "@/lib/supabaseServerClient";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const getCategoryName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    T1H: "기온",
    RN1: "1시간 강수량",
    SKY: "하늘상태",
    REH: "습도",
    PTY: "강수형태",
    LGT: "낙뢰",
    WSD: "풍속",
  };
  return categoryMap[category] || category;
};

const formatWeatherData = (weatherData: WeatherItem[]): string => {
  if (!weatherData || weatherData.length === 0) return "";

  const weatherItems = weatherData
    .map((item) => {
      const categoryName = getCategoryName(item.category);
      let value = item.obsrValue;

      if (item.category === "T1H") value += "°C";
      if (item.category === "RN1") value += "mm";
      if (item.category === "REH") value += "%";
      if (item.category === "WSD") value += "m/s";
      return `${categoryName}: ${value}`;
    })
    .join(", ");

  return `현재 날씨 정보: ${weatherItems}`;
};

export async function POST(request: Request) {
  try {
    const { userId, message, weatherData } = await request.json();

    if (!userId || !message) {
      return NextResponse.json(
        { error: "Missing userId or message" },
        { status: 400 }
      );
    }

    const supabase = await supabaseServerClient();
    const { data } = await supabase
      .from("items")
      .select("id, name, images, seasons")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    let weatherInfo = "";
    if (weatherData && Array.isArray(weatherData) && weatherData.length > 0) {
      weatherInfo = formatWeatherData(weatherData as WeatherItem[]);
    }
    console.log("유저 ID: ", userId);
    console.log("조회한 의류 데이터 : ", data);
    console.log("조회한 날씨 데이터 : ", weatherInfo);

    const formattedItems =
      data?.map((item) => ({
        id: item.id,
        name: item.name,
        seasons: item.seasons,
        hasImage: item.images && item.images.length > 0,
      })) || [];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            '너는 스타일 추천 전문가야. 사용자의 옷장에 있는 의류 데이터를 분석하여 날씨와 사용자 요구사항에 맞는 스타일을 추천해줘. 반드시 사용자가 보유한 의류 중에서만 추천해야 해. 응답은 반드시 다음 JSON 형식으로 해야 해: {"text": "추천 설명 텍스트", "recommendedItemIds": ["id1", "id2", ...]}',
        },
        {
          role: "user",
          content: `사용자 메시지: ${message}\n${
            weatherInfo ? weatherInfo + "\n" : ""
          }사용자 옷장 데이터: ${JSON.stringify(
            formattedItems
          )}\n\n위 옷장 데이터에서 추천할 의류의 id를 recommendedItemIds 배열에 포함시켜줘.`,
        },
      ],
    });

    const aiResponseContent = completion.choices[0].message?.content;

    if (!aiResponseContent) {
      return NextResponse.json(
        { error: "AI 응답을 받지 못했습니다." },
        { status: 500 }
      );
    }

    try {
      const parsedResponse = JSON.parse(aiResponseContent);
      const recommendedItemIds = parsedResponse.recommendedItemIds || [];
      const text = parsedResponse.text || aiResponseContent;

      const recommendedItems =
        data?.filter((item) => recommendedItemIds.includes(item.id)) || [];

      return NextResponse.json({
        reply: text,
        recommendedItems: recommendedItems.map((item) => ({
          id: item.id,
          name: item.name,
          images: item.images || [],
        })),
      });
    } catch (parseError) {
      console.error("JSON 파싱 실패:", parseError);
      return NextResponse.json({
        reply: aiResponseContent,
        recommendedItems: [],
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
