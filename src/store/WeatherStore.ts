import axios from "axios";
import { defineStore } from "pinia";
import { fetchWeather } from "../http/api";
import { CWeather, City, CityWeather, StoreCity } from "../types/Types";
import { dewPoint, windDirection } from "../functions/weatherCalculations";

// const windDirection = (degree: number) => {
//   const dir = Math.round(degree / 22.5);
//   switch (dir) {
//     case 0:
//       return { name: "N", icon: "arrow-up" };
//     case 1:
//       return { name: "NNE", icon: "arrow-up" };
//     case 2:
//       return { name: "NE", icon: "arrow-up-right" };
//     case 3:
//       return { name: "ENE", icon: "arrow-up-right" };
//     case 4:
//       return { name: "E", icon: "arrow-right" };
//     case 5:
//       return { name: "ESE", icon: "arrow-down-right" };
//     case 6:
//       return { name: "SE", icon: "arrow-down-right" };
//     case 7:
//       return { name: "SSE", icon: "arrow-down" };
//     case 8:
//       return { name: "S", icon: "arrow-down" };
//     case 9:
//       return { name: "SSW", icon: "arrow-down" };
//     case 10:
//       return { name: "SW", icon: "arrow-down-left" };
//     case 11:
//       return { name: "WSW", icon: "arrow-down-left" };
//     case 12:
//       return { name: "W", icon: "arrow-left" };
//     case 13:
//       return { name: "WNW", icon: "arrow-up-left" };
//     case 14:
//       return { name: "NW", icon: "arrow-up-left" };
//     case 15:
//       return { name: "NNW", icon: "arrow-up" };
//     default:
//       return { name: "N", icon: "arrow-up" };
//   }
// };

// const dewPoint = (temp: number, humidity: number) => {
//   const CONST_A = 17.625;
//   const CONST_B = 243.04;

//   // calculate numerator of Td equation
//   let dew_numer =
//     CONST_B *
//     (Math.log(humidity / 100.0) + (CONST_A * temp) / (temp + CONST_B));
//   // calculate denominator of Td equation
//   let dew_denom =
//     CONST_A - Math.log(humidity / 100.0) - (CONST_A * temp) / (temp + CONST_B);

//   // calculate the dew point
//   let dew = dew_numer / dew_denom;

//   return Math.floor(dew);
// };

export const useWeatherStore = defineStore("current-weather", {
  state: () => ({
    cities: [
      {
        name: "London",
        state: "England",
        lat: 51.5073219,
        lon: -0.1276474,
        country: "GB",
        id: 2643743,
      },
    ] as StoreCity[],
    currentWeathers: [] as CityWeather[],
  }),
  getters: {
    getAllWeather: (state) => state.currentWeathers,
    getCities: (state) => state.cities,
  },
  actions: {
    async fetchCountryWeather(query: Object) {
      const { data } = await fetchWeather(query);
      this.addWeather(data);
    },
    addWeather(data: CWeather) {
      const dew_point = dewPoint(data.main.temp, data.main.humidity);
      const wind_direction = windDirection(data.wind.deg);

      this.currentWeathers = [
        ...this.currentWeathers,
        {
          ...data,
          dew_point: dew_point,
          wind_direction: wind_direction,
        },
      ];
    },
    async addCity(city: City) {
      const { data } = await fetchWeather({ lat: city.lat, lon: city.lon });

      if (this.cities.filter((item) => item.id === data.id).length === 0) {
        this.addWeather(data);
        this.cities = [...this.cities, { ...city, id: data.id }];
      }

      this.saveCities();
    },
    deleteCity(city: StoreCity) {
      this.cities = this.cities.filter((item) => item.id !== city.id);
      this.currentWeathers = this.currentWeathers.filter(
        (item) => item.id !== city.id
      );

      this.saveCities();
    },
    async addUserLocation(lat: number, lon: number) {
      const { data } = await fetchWeather({ lat: lat, lon: lon });
    },
    updateCurrentWeathers() {
      this.cities.forEach((item) =>
        this.fetchCountryWeather({ lat: item.lat, lon: item.lon })
      );
    },
    saveCities() {
      const cities_to_save = JSON.stringify(this.cities);
      localStorage.setItem("cities", cities_to_save);
    },
    loadCities() {
      const saved_cities = localStorage.getItem("cities");

      if (typeof saved_cities === "string") {
        const parsed_cities = JSON.parse(saved_cities);
        this.cities = parsed_cities;
      }

      this.updateCurrentWeathers();
    },
  },
});
