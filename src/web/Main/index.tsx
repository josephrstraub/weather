import React, { useEffect, useState } from 'react';
import SearchBar from '../SearchBar';
import API from '../../API';
import CONSTANTS from '../../constants';
import { Color, GeolocationCoordinates, Location } from '../../definitions';
import useCityFetcher from '../../hooks/useCityFetcher';
import useInput from '../../hooks/useInput';
import Forecast from '../../components/Forecast/index.web';
import styles from './styles';

const Main = () => {
  const [backgroundColor, setBackgroundColor] = useState<Color>(CONSTANTS.COLORS.warm);
  const [selectedLocation, setSelectedLocation] = useState<null | Location | undefined>(null);
  const { inputProps, value: inputValue, reset: resetSearchBarValue } = useInput('');
  const cities = useCityFetcher(inputValue);

  const onCitySelect = async (placeId: string) => {
    setSelectedLocation(await API.getLocationDetail(placeId));
    resetSearchBarValue();
  };

  const getCurrentLocation = () => {
    const onGeoSuccess = async ({ coords }: GeolocationCoordinates) => {
      const city = await API.getCityNameByCoords(coords.latitude, coords.longitude);
      setSelectedLocation({
        city,
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    };
    const onGeoError = () => {
      alert('Could not get current location at this time.');
    };
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  useEffect(getCurrentLocation, []);

  return (
    <main style={{ ...styles.main, backgroundColor } as any}>
      <SearchBar {...inputProps} cities={cities} onCitySelect={onCitySelect} />
      {selectedLocation && (
        <>
          <h1>{selectedLocation.city}</h1>
          <Forecast {...selectedLocation} setBackgroundColor={setBackgroundColor} />
        </>
      )}
    </main>
  );
};

export default Main;
