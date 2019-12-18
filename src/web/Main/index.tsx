import React, { useState } from 'react';
import SearchBar from '../SearchBar';
import API from '../../API';
import { Location } from '../../definitions';
import useCityFetcher from '../../hooks/useCityFetcher';
import useInput from '../../hooks/useInput';
import styles from './styles';

const Main = () => {
  const [selectedLocation, setSelectedLocation] = useState<null | Location | undefined>(null);
  const { inputProps, value: inputValue, reset: resetSearchBarValue } = useInput('');
  const cities = useCityFetcher(inputValue);

  const onLocationSelect = async (placeId: string) => {
    setSelectedLocation(await API.getLocationDetail(placeId));
    resetSearchBarValue();
  };

  return (
    <main style={styles.main as any}>
      {selectedLocation && <h1>{selectedLocation.city}</h1>}
      <SearchBar {...inputProps} locations={cities} onLocationSelect={onLocationSelect} />
    </main>
  );
};

export default Main;
