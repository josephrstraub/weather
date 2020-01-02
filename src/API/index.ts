import CONSTANTS from '../constants';

const { API_KEYS } = CONSTANTS;
const PROXY_URL = process.env.REACT_APP_IS_WEB ? 'https://cors-anywhere.herokuapp.com/': '';

// let controller: null | AbortController = null;

export default {
  getCities: async (query: string) => {
    // if (controller) {
    //   controller.abort();
    //   controller = null;
    // }
    // controller = new AbortController();
    // const { signal } = controller;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=${API_KEYS.google}`;
    try {
      const response = await fetch(PROXY_URL + url);
      if (response.ok) {
        const { predictions } = await response.json();
        return predictions;
      }
    } catch(error) {
      throw Error(error);
    }
  },
  getCityNameByCoords: async (latitude: number, longitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&types=(locality)&key=${API_KEYS.google}`;
    try {
      const response = await fetch(PROXY_URL + url);
      if (response.ok) {
        const { results } = await response.json();
        return results[0].address_components.find((addressComponent: any) => {
          return addressComponent.types.includes('locality');
        }).short_name;
      }
    } catch {}
  },
  getCurrentWeather: async (latitude: number, longitude: number) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEYS.openWeatherMap}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const { main, weather } = await response.json();
        return {
          data: {
            description: weather[0].main,
            icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            temperature: Math.round(main.temp),
          },
          error: null,
        };
      }
      throw Error();
    } catch(error) {
      return { data: null, error: "Could not fetch weather data at this time." };
    }
  },
  getForecast: async (latitude: number, longitude: number) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&units=imperial&cnt=10&appid=${API_KEYS.openWeatherMap}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const { main, weather } = await response.json();
        return {
          data: {
            description: weather[0].main,
            icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            temperature: Math.round(main.temp),
          },
          error: null,
        };
      }
      throw Error();
    } catch(error) {
      return { data: null, error: "Could not fetch weather data at this time." };
    }
  },
  getLocationDetail: async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${API_KEYS.google}`;
    try {
      const response = await fetch(PROXY_URL + url);
      if (response.ok) {
        const { result } = await response.json();
        const { lat: latitude, lng: longitude } = result.geometry.location;
        return { latitude, longitude, city: result.name };
      }
    } catch {}
  },
};
