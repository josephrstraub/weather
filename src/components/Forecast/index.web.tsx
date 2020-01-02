import React, { FC } from 'react';
import useForecastContainer from '../../hooks/useForecastContainer';
import styles from './styles.web';

interface Props {
  latitude: number;
  longitude: number;
  setBackgroundColor: (color: string) => void;
}

const Forecast: FC<Props> = (props) => {
  const { errorMessage, forecast } = useForecastContainer(props);

  return (
    <div style={styles.container}>
      {forecast && <img src={forecast.icon} style={styles.icon} />}
      <div style={styles.degreesTextContainer}>
        <span style={forecast ? styles.degrees : {}}>
          {forecast ? forecast.temperature : errorMessage}
        </span>
        {forecast && <span style={styles.degreesIcon}>{'\u00B0'}</span>}
        {forecast && <span style={styles.scale}>F</span>}
      </div>
      {forecast && <h4 style={styles.forecastDescription}>{forecast.description}</h4>}
    </div>
  );
};

export default Forecast;
