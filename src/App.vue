<template>
  <div class="container mx-auto">
    <div class="flex gap-x-2">
      <div class="w-1/4">
        <div
          class="p-4 bg-white"
          v-for="weather in getAllWeather"
          :key="weather.id"
        >
          <div class="flex flex-col">
            <div class="font-semibold text-sm">
              {{ weather.name }}, {{ weather.sys.country }}
            </div>
            <div class="flex items-center">
              <div class="w-1/2">
                <img
                  :src="`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`"
                  class="w-full"
                  alt=""
                />
              </div>
              <div class="w-1/2">
                <div class="text-5xl font-semibold">
                  {{ Math.floor(weather.main.temp) }}°C
                </div>
              </div>
            </div>
            <div class="desc mb-4">
              Feels like {{ Math.floor(weather.main.feels_like) }}°C.
              {{ weather.weather[0].main }}.
              {{ weather.weather[0].description }}.
            </div>
            <div class="grid grid-cols-2 gap-x-2 gap-y-4">
              <div>
                <i :class="`ti ti-${weather.wind_direction.icon} text-lg`"></i>
                {{ weather.wind.speed }}m/s
                {{ weather.wind_direction.name }}
              </div>
              <div>
                <i class="ti ti-brand-speedtest text-lg"></i>
                {{ weather.main.pressure }}hPa
              </div>
              <div>Humidity: {{ weather.main.humidity }}%</div>
              <div>
                Dew point:
                {{ weather.dew_point }}°C
              </div>
              <div>
                Visibility: {{ (weather.visibility / 1000).toFixed(1) }}km
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/4">
        <div class="flex flex-col bg-white">
          <div class="flex p-2">
            <h2>Settings</h2>
          </div>
          <div class="p-2">
            <ul>
              <li class="mb-2" v-for="city in getCities">
                <div
                  class="p-1 bg-gray-200 flex items-center gap-x-3 rounded-md"
                >
                  <button
                    class="block leading-none p-1 text-lg rounded-md hover:bg-gray-300"
                  >
                    <i class="ti ti-menu"></i>
                  </button>
                  <div class="city-name flex-1">
                    {{ city.name }}, {{ city.state }}, {{ city.country }}
                  </div>
                  <button
                    @click="deleteCity(city)"
                    class="block leading-none p-1 text-lg rounded-md hover:bg-gray-300"
                  >
                    <i class="ti block ti-trash"></i>
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex flex-col p-2">
            <form @submit.prevent="fetchCities(cityName)" class="flex flex-col">
              <div>
                <label
                  for="price"
                  class="block text-sm font-medium leading-6 text-gray-900"
                  >Add location:</label
                >
                <div class="relative mt-2 flex gap-x-2">
                  <input
                    type="text"
                    name="price"
                    id="price"
                    class="rounded-md shadow-sm block w-full border-0 py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="e.g New York"
                    v-model="cityName"
                  />
                  <button
                    type="submit"
                    class="rounded-md shadow-sm py-1.5 px-3 sm:text-sm sm:leading-6 bg-indigo-600 text-white"
                  >
                    <i class="ti ti-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <div
              v-if="cities.length"
              class="rounded-md py-2 border border-gray-100 mt-3 min-h-[4rem]"
            >
              <ul>
                <li v-for="city in cities" :key="city.country">
                  <button
                    @click="addCityToStore(city)"
                    class="flex p-2 hover:bg-slate-50 w-full items-center gap-x-3"
                  >
                    <div class="city-name text-left flex-1">
                      {{ city.name }}, {{ city.state }}, {{ city.country }}
                    </div>
                    <div
                      class="city-loc text-xs text-gray-400 font-mono text-right"
                    >
                      {{ city.lat.toFixed(2) }}, {{ city.lon.toFixed(2) }}
                    </div>
                  </button>
                </li>
              </ul>
            </div>
            <div
              v-if="!cities.length"
              class="rounded-md p-4 bg-gray-100 text-center mt-3"
            >
              No cities
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapState } from "pinia";
import { useWeatherStore } from "./store/WeatherStore";
import { City } from "./types/Types";
import { fetchCities, fetchCityByCor } from "./http/api";

export default defineComponent({
  name: "App",
  components: {},
  data() {
    return {
      cities: [] as City[],
      cityName: "" as string,
      currLocation: {
        latitude: 0 as number,
        longitude: 0 as number,
      },
    };
  },
  methods: {
    ...mapActions(useWeatherStore, [
      "addCity",
      "deleteCity",
      "updateCurrentWeathers",
      "loadCities",
    ]),
    async fetchCities(cityname: string) {
      const { data } = await fetchCities({ q: cityname, limit: 5 });
      this.cities = [...data];
    },
    async fetchCity(lat: number, lon: number) {
      const { data } = await fetchCityByCor({ lat: lat, lon: lon });
      console.log(data);
      await this.addCity(...data);
    },
    addCityToStore(city: City) {
      this.addCity(city);
      this.cityName = "";
      this.cities = [];
    },
  },
  created() {
    this.loadCities();
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        this.fetchCity(
          currentPosition.coords.latitude,
          currentPosition.coords.longitude
        );
      });
    } else {
      alert("Geolocation is not supported in this browser");
    }
  },
  computed: {
    ...mapState(useWeatherStore, ["getAllWeather", "getCities"]),
  },
});
</script>
