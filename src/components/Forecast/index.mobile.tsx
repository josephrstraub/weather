import React, { FC } from 'react';
import { Image, Text, View } from 'react-native';
import useForecastContainer from '../../hooks/useForecastContainer';
import styles from './styles.mobile';

interface Props {
  latitude: number;
  longitude: number;
  setBackgroundColor: (color: string) => void;
}

const Forecast: FC<Props> = (props) => {
  const { errorMessage, forecast } = useForecastContainer(props);

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
