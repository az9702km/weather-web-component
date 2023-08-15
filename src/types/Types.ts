

export interface City {
  name: string;
  country: string;
  state: string;
  lon: number;
  lat: number
}

export interface StoreCity extends City {
  id: number
}

type Weather = {
  main: string;
  description: string;
  icon: string;
};

type MainWeather = {
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

export interface CWeather {
  weather: Weather[];
  main: MainWeather;
  visibility: number;
  wind: Wind;
  name: string;
  id: number;
  sys: {
    country: string;
  };
}

export interface CityWeather extends CWeather {
  wind_direction: {
    name: string;
    icon: string;
  };
  dew_point: number;
}