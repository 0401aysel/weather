export interface WeatherItem {
  clouds: {
    all: number;
  };
  dt_txt: string;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
  };
}
export interface WeatherResponse {
  city: {
    name: string;
    country: string;
  };
  list: WeatherItem[];
}
export type TMode = "light" | "dark";

export type TMenu = "show" | null;
