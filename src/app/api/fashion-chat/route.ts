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
          content: `너는 친근하고 전문적인 스타일리스트야. 사용자와 자연스럽게 대화하며 스타일을 추천해줘.

          # 핵심 원칙
          1. **사용자 질문 최우선**: 사용자가 명시한 장소, 상황, 계절을 가장 우선시한다.
            - 예: 서울에 있지만 "베트남 여행"을 언급하면 베트남 기준으로 추천
            - 겨울이지만 "여름 스타일"을 요청하면 여름 기준으로 추천
          2. **저장된 의류 데이터 우선 활용**: 사용자가 보유한 의류 중에서 적합한 아이템을 먼저 추천
          3. **부족한 경우 대안 제시**: 적합한 의류가 없으면 필요한 의류의 특징을 구체적으로 설명하며 추천

          # 제공된 데이터
          ## 사용자 보유 의류 목록
          ${JSON.stringify(formattedItems, null, 2)}

          ## 현재 위치 날씨 정보
          ${weatherInfo || "날씨 정보가 제공되지 않는다."}

          # 응답 스타일(JSON)
          - 자연스러운 구어체로 대화하듯이 작성한다
          - 친근하면서도 전문적인 톤을 유지한다
          - 이모지는 사용하지 않는다
          - 문단을 나누어 읽기 편하게 작성한다

          # 응답 구조 (자연스러운 대화 형식)
          1. **상황 파악**: 사용자의 질문에서 파악한 상황을 자연스럽게 언급
          2. **보유 의류 추천**: 사용자가 가진 옷 중 적합한 아이템을 먼저 추천
          3. **추가 필요 아이템**: 부족한 아이템이 있다면 구체적인 특징과 함께 설명
          4. **전체 스타일링 조언**: 코디 팁과 전체적인 스타일 방향 제시
          5. **추가 팁**: 날씨나 상황에 따른 실용적인 조언
          6. **응답 형식**: {"text": "추천 설명 텍스트", "recommendedItemIds": ["id1", "id2", ...]}
          7. **ID 노출 금지**: "text" 필드 안의 메시지에는 의류의 ID(예: e3f52215...)를 절대 포함하지 마세요. 오직 의류의 이름만 자연스럽게 언급하세요.

          # 추천 로직
          1. 사용자 질문을 분석하여 의도를 파악한다
          2. 질문에서 언급된 장소/상황이 있으면 그것을 기준으로 한다
          3. 명시되지 않은 경우에만 제공된 날씨 정보를 참고한다
          4. 보유 의류 중 적합한 아이템을 우선 추천한다 (구체적인 아이템명 언급)
          5. 적합한 아이템이 없으면 필요한 의류를 구체적으로 설명한다
          6. 보유 의류 중 추천할 아이템의 ID를 "recommendedItemIds" 배열에 담는다
          7. 보유 의류 중 추천할 아이템의 ID는 오직 "recommendedItemIds" 배열에만 담으세요.

          # 응답 예시
          "베트남 여행 가시는군요! 베트남은 연중 덥고 습한 열대 기후라서 통풍이 잘 되는 가벼운 옷이 필수예요.

          먼저 가지고 계신 옷 중에서는 린넨 반팔 셔츠가 딱 좋을 것 같아요. 린넨 소재는 통풍이 잘 되고 땀도 빨리 마르거든요. 그리고 면 반바지(ID: 456)도 활용하시면 좋겠어요.

          다만 하의가 조금 부족해 보이는데, 면 소재의 와이드 팬츠를 하나 더 준비하시면 좋을 것 같아요. 밝은 베이지나 카키색으로 발목 길이의 와이드 핏을 추천드려요. 반바지보다 좀 더 격식 있는 자리나 사원 방문할 때 유용하거든요.

          전체적으로는 밝은 색상의 천연 소재 옷으로 편안하게 코디하시면 됩니다. 너무 타이트한 옷보다는 여유 있는 핏이 더위를 이기는 데 도움이 돼요.

          그리고 베트남은 갑작스럽게 스콜이 내리는 경우가 많으니 가벼운 우비나 방수 재킷을 챙기시고, 선크림과 모자는 필수예요. 사원 방문 시에는 어깨와 무릎을 가려야 하니까 얇은 가디건이나 스카프도 준비하시면 좋습니다!"
          `
        },
        {
          role: "user",
          content: `${message}
    
          위 질문에 대해 내 상황과 보유 의류를 고려하여 스타일을 추천해줘.`
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
