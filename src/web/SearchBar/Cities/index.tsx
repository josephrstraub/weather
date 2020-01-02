import React, { FC } from 'react';
import { GooglePlacesCity } from '../../../definitions';
import styles from './styles';

interface Props {
  cities: GooglePlacesCity[];
  onCitySelect: (placeId: string) => void;
}

const Cities: FC<Props> = ({ cities, onCitySelect }) => (
  <>
    {cities.map(city => (
      <div key={city.place_id} onClick={() => onCitySelect(city.place_id)} style={styles.container}>
        <img src="" width="16" height="16" id="place-icon" />
        <span>{city.description}</span>
      </div>
    ))}
  </>
);

export default Cities;
