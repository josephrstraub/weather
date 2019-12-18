import React, { FC } from 'react';
import { GooglePlacesLocation } from '../../definitions';
import Locations from './Locations';
import styles from './styles';

interface Props {
  locations: GooglePlacesLocation[];
  onLocationSelect: (placeId: string) => void;
}

const SearchBar: FC<Props> = ({ locations, onLocationSelect, ...inputProps }) => {
  return (
    <>
      <input list="browsers" name="myBrowser" style={styles.input} {...inputProps} />
      <datalist id="browsers" style={styles.dataList}>
        <Locations locations={locations} onLocationSelect={onLocationSelect} />
      </datalist>
    </>
  );
};

export default SearchBar;
