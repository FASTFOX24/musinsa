import type { WeatherItem } from "@/types/weather";

const DEFAULT_LOCATION = { lat: 37.5665, lon: 126.978 };

const fetchWeatherByLocation = async (
  lat: number,
  lon: number
): Promise<WeatherItem[]> => {
  const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
  const result = await response.json();

  if (result.success) {
    return result.data;
  }

  throw new Error("날씨 정보를 가져올 수 없습니다.");
};

export const fetchCurrentWeather = async (): Promise<WeatherItem[]> => {
  if (!navigator.geolocation) {
    return fetchWeatherByLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
  }
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      }
    );

    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    const result = await response.json();

    if (result.success) {
      return result.data;
    }

    throw new Error("날씨 API 호출 실패");
  } catch (error) {
    console.warn(
      "위치 정보를 가져올 수 없어 기본 위치로 날씨를 가져옵니다:",
      error
    );
    return fetchWeatherByLocation(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
  }
};
