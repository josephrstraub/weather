import React, { FC, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import API from '../../API';
import CONSTANTS from '../../constants';
import UTILS from '../../utils';
import { ForecastDefinition } from '../../definitions';
import styles from './styles';

interface Props {
  latitude: number;
  longitude: number;
  setBackgroundColor: (color: string) => void;
}

const Forecast: FC<Props> = ({ latitude, longitude, setBackgroundColor }) => {
  const [forecast, setForecast] = useState<null | ForecastDefinition>(null);
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  useEffect(
    () => {
      const getForecast = async () => {
        const { data, error } = await API.getForecast(latitude, longitude);
        setErrorMessage(error);
        setForecast(data);
      };
      getForecast();
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
    [setBackgroundColor, forecast],
  );

  return (
    <View style={styles.container}>
      {forecast && <Image source={{ uri: forecast.icon }} style={styles.icon} />}
      <View style={styles.degreesTextContainer}>
        <Text style={forecast ? styles.degrees : null}>
          {forecast ? forecast.temperature : errorMessage}
          {forecast && <Text>{'\u00B0'}</Text>}
        </Text>
        {forecast && <Text style={styles.scale}>F</Text>}
      </View>
      {forecast && <Text>{forecast.description}</Text>}
    </View>
  );
};

export default Forecast;
