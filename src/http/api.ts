import { AxiosResponse } from "axios";
import { api } from "./axios";
const token: string = "71b8ffb557e7c8e38e25fbe092468a90";
import { CWeather, City } from "../types/Types";

export const fetchCities = (query: Object): Promise<AxiosResponse<City>> => {
  return api({
    url: "geo/1.0/direct",
    method: "GET",
    params: { ...query, appid: token },
  });
};

export const fetchCityByCor = (query: Object): Promise<AxiosResponse<City>> => {
  return api({
    url: "geo/1.0/reverse",
    method: "GET",
    params: { ...query, appid: token },
  });
};

export const fetchWeather = (
  query: Object
): Promise<AxiosResponse<CWeather>> => {
  return api({
    url: "data/2.5/weather",
    method: "GET",
    params: { ...query, appid: token, units: 'metric' },
  });
};
