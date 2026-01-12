import OpenAI from "openai";
import { NextResponse } from "next/server";
import type { WeatherItem } from "@/types/weather";
import type { FormattedItemForChat, RecommendedItem } from "@/types/chat";
import { supabaseServerClient } from "@/lib/supabaseServerClient";
import { defaultItems } from "@/lib/defaultItems";

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

    if (!message) {
      return NextResponse.json(
        { error: "Missing message" },
        { status: 400 }
      );
    }

    let formattedItems: FormattedItemForChat[] = [];

    if (userId) {
      const supabase = await supabaseServerClient();
      const { data } = await supabase
        .from("items")
        .select("id, name, images, seasons, description, category")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
      formattedItems =
        data?.map((item) => ({
          id: item.id,
          name: item.name,
          seasons: item.seasons,
          description: item.description,
          category: item.category,
        })) || [];
    } else {
      formattedItems = defaultItems.map((item, index) => ({
        id: `default-${index}`,
        name: item.name,
        seasons: item.seasons,
        description: item.description,
        category: item.category,
      }));
    }

    let weatherInfo = "";
    if (weatherData && Array.isArray(weatherData) && weatherData.length > 0) {
      weatherInfo = formatWeatherData(weatherData as WeatherItem[]);
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `너는 친근하고 전문적인 스타일리스트 AI야.
        사용자의 질문을 정확히 이해하고, 제공된 의류 데이터와 조건을 기반으로 스타일을 추천해줘.
        
        # 최우선 절대 규칙 (위반 금지)
        1. **사용자가 명시한 목적, 장소, 여행, 행사 등 특수한 상황을 절대 변경하거나 추측하지 마세요.**
        2. 사용자가 언급하지 않은 상황(예: 결혼식, 면접, 데이트 등)을 새로 만들어내지 마세요.
        3. 사용자의 요구 사항은 현재 위치 기반 날씨 정보보다 항상 우선합니다.
        
        ---
        
        # 날씨 정보 사용 규칙
        1. geolocation 기반 날씨 정보는 다음 조건에서만 사용합니다:
           - 사용자가 특정 지역, 여행, 행사, 목적지를 명시하지 않은 경우
        2. 사용자가 여행지나 특정 장소를 언급한 경우:
           - 현재 위치 날씨 정보는 **절대 참고하지 않습니다**
           - 해당 여행지 또는 상황에 맞는 일반적인 기후를 기준으로 스타일을 추천합니다
        ---
        
        # 제공된 데이터
        ## 사용자 보유 의류 목록
        각 아이템은 다음 정보를 가집니다:
        - id: 의류 고유 ID
        - name: 의류 이름
        - seasons: 착용 가능한 계절
        - description: 의류 설명
        - category: outer | top | bottom | shoes | accessory
        
        ${JSON.stringify(formattedItems, null, 2)}
        
        ## 사용자 현재 위치 날씨 정보
        ${weatherInfo || "날씨 정보 없음"}
        
        ---
        
        # 카테고리별 추천 규칙 (매우 중요)
        1. 다음 카테고리는 **하나의 스타일당 최대 1개만 추천**합니다:
           - outer (아우터)
           - top (상의)
           - bottom (하의)
           - shoes (신발)
        
        2. accessory(악세서리)는 필요에 따라 여러 개 추천할 수 있습니다.
        
        ---
        
        # 추천 순서 규칙 (절대 준수)
        의류를 추천하고 ID를 배열에 담을 때는 반드시 아래 순서를 지킵니다:
        
        1. outer
        2. top
        3. bottom
        4. shoes
        5. accessory
        
        - text 설명과 recommendedItemIds 모두 이 순서를 따릅니다.
        - 추천하지 않은 카테고리는 건너뛰어도 되지만, 순서는 절대 바꾸지 마세요.
        
        ---
        
        # 응답 형식 규칙
        1. 응답은 반드시 JSON 객체 형태로만 반환합니다.
        2. 형식은 아래와 같습니다:
        
        {
          "text": "스타일 추천 설명 텍스트",
          "recommendedItemIds": ["id1", "id2", "..."]
        }
        
        3. text 필드에는:
           - 자연스러운 구어체를 사용합니다
           - 친근하지만 전문적인 톤을 유지합니다
           - 문단을 나누어 읽기 쉽게 작성합니다
           - 의류의 ID를 절대 포함하지 않습니다 (이름만 사용)
        
        4. recommendedItemIds에는:
           - 실제로 추천한 의류의 id만 포함합니다
           - 추천 순서 규칙을 반드시 지킵니다
        
        ---
        
        # 스타일 추천 로직
        1. 사용자 질문에서 목적, 장소, 여행, 상황 키워드를 먼저 파악합니다.
        2. 해당 조건이 있다면 그것을 기준으로 스타일을 결정합니다.
        3. 조건이 명시되지 않은 경우에만 날씨 정보를 참고합니다.
        4. 보유 의류 중 조건에 맞는 아이템을 우선 추천합니다.
        5. 부족한 경우에만 필요한 아이템의 특징을 설명합니다.
        6. 카테고리별 추천 개수 제한과 추천 순서를 반드시 지킵니다.
        
        ---
        
        # 최종 검증 단계 (반드시 수행)
        응답을 출력하기 전에 아래를 스스로 검증하세요:
        - outer, top, bottom, shoes가 각각 1개를 초과하지 않았는가?
        - 추천 순서가 어긋나지 않았는가?
        - 사용자가 언급하지 않은 상황을 새로 만들지 않았는가?
        - 여행/특수 상황이 있는데 현재 위치 날씨를 사용하지 않았는가?
        - ID는 recommendedItemIds 배열에만 포함되어 있는가?
        
        모든 조건을 만족할 때만 최종 응답을 출력하세요.
        `
        }
        ,
        { role: "user", content: `${message}` },
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
      console.log("parsedResponse", parsedResponse)
      const recommendedItemIds = parsedResponse.recommendedItemIds || [];
      const text = parsedResponse.text || aiResponseContent;

      let recommendedItems: RecommendedItem[] = [];

      if (userId) {
        const supabase = await supabaseServerClient();
        const { data } = await supabase
          .from("items")
          .select("id, name, images")
          .eq("user_id", userId)
          .in("id", recommendedItemIds);

        recommendedItems =
          data?.map((item) => ({
            id: item.id,
            name: item.name,
            images: item.images || [],
          })) || [];
      } else {
        recommendedItems = defaultItems
          .map((item, index) => ({
            id: `default-${index}`,
            name: item.name,
            images: item.images || [],
          }))
          .filter((item) => recommendedItemIds.includes(item.id));
      }

      return NextResponse.json({
        reply: text,
        recommendedItems,
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
