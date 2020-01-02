import { useEffect, useState } from 'react';
import API from '../API';
import CONSTANTS from '../constants';
import UTILS from '../utils';
import { ForecastDefinition } from '../definitions';

interface Props {
  latitude: number;
  longitude: number;
  setBackgroundColor: (color: string) => void;
}

export default ({ latitude, longitude, setBackgroundColor }: Props) => {
  const [forecast, setForecast] = useState<null | ForecastDefinition>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(
    () => {
      const getCurrentWeather = async () => {
        const { data, error } = await API.getCurrentWeather(latitude, longitude);
        setErrorMessage(error);
        setForecast(data);
      };
      getCurrentWeather();
    },
    [latitude, longitude],
  );

  useEffect(
    () => {
      if (forecast) {
        const backgroundColor = UTILS.isCold(forecast.temperature)
          ? CONSTANTS.COLORS.cold
          : CONSTANTS.COLORS.warm;
        setBackgroundColor(backgroundColor);
      }
    },
    [forecast],
  );

  return { errorMessage, forecast };
};
