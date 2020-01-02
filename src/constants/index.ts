import Constants from 'expo-constants';

export default {
  API_KEYS: {
    google: process.env.REACT_APP_IS_WEB
      ? process.env.REACT_APP_GOOGLE_API_KEY
      : Constants.manifest.extra.apiKeys.google,
    openWeatherMap: process.env.REACT_APP_IS_WEB
      ? process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY
      : Constants.manifest.extra.apiKeys.openWeatherMap,
  },
  COLORS: {
    cold: '#3891A6',
    warm: '#EEB851',
  },
};
