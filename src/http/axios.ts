import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/",
  timeout: 500000,
})  