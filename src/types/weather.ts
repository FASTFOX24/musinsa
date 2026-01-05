export type WeatherItem = {
  baseDate: string;
  baseTime: string;
  category: string;
  nx: number;
  ny: number;
  obsrValue: string;
};

export type WeatherResponse = {
  response: {
    header: {
      resultCode: string;
      resultMsg: string;
    };
    body: {
      dataType: string;
      items: {
        item: WeatherItem[];
      };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
  };
};

export type WeatherData = {
  lat: number;
  lon: number;
  data: WeatherItem[];
};
