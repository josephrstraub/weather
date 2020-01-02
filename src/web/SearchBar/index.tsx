import React, { FC } from 'react';
import { GooglePlacesCity } from '../../definitions';
import Cities from './Cities';
import styles from './styles';

interface Props {
  cities: GooglePlacesCity[];
  onCitySelect: (placeId: string) => void;
}

const SearchBar: FC<Props> = ({ cities, onCitySelect, ...inputProps }) => {
  return (
    <>
      <input placeholder="Search Cities" style={styles.input} {...inputProps} />
      <Cities cities={cities} onCitySelect={onCitySelect} />
    </>
  );
};

export default SearchBar;
