import React, { useEffect, useRef, useState } from 'react';
import { BlurView } from 'expo-blur';
import * as LocationService from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert, Platform, SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import API from './src/API';
import CONSTANTS from './src/constants';
import Forecast from './src/components/Forecast';
import Locations from './src/components/Locations';
import { Color, GooglePlacesLocation, Location } from './src/definitions';
import useInput from './src/hooks/useInput';
import styles from './styles';

const App = () => {
  const [backgroundColor, setBackgroundColor] = useState<Color>(CONSTANTS.COLORS.warm);
  const [selectedLocation, setSelectedLocation] = useState<null | Location>(null);
  const [locationAccessPermissionIsGranted, setLocationAccessPermissionStatus] = useState(false);
  const [locations, setLocations] = useState<GooglePlacesLocation[]>([]);
  const { value: searchBarValue, reset: resetSearchBarValue, inputProps: searchBarProps } = useInput('');

  const searchBar = useRef();

  const checkLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    setLocationAccessPermissionStatus(status === 'granted');
    if (status !== 'granted') {
      Alert.alert(
        'Location Access',
        `Please enable location permissions for this application in your device's settings.`,
      );
    }
  };

  const getCurrentLocation = async () => {
    const { coords } = await LocationService.getCurrentPositionAsync({});
    const [postalAddress] = await LocationService.reverseGeocodeAsync({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
    setSelectedLocation({
      city: postalAddress.city,
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onLocationSelect = async (placeId: string) => {
    setSelectedLocation(await API.getLocationDetail(placeId));
    resetSearchBarValue();
    if (searchBar.current) {
      searchBar.current.blur();
    }
  };

  useEffect(
    () => {
      checkLocationPermission();
    },
    [],
  );

  useEffect(() => {
    const fetchCities = async () => {
      if (!searchBarValue) {
        setLocations([]);
        return;
      }
      setLocations(await API.getCities(searchBarValue));
    };
    fetchCities();
  }, [searchBarValue]);

  useEffect(() => {
    if (locationAccessPermissionIsGranted) {
      getCurrentLocation();
    }
  }, [locationAccessPermissionIsGranted]);

  const blurIntensity = (searchBarValue.length > 0) ? 90 : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {selectedLocation && (
        <>
          <Text style={styles.cityName}>{selectedLocation.city}</Text>
          <Forecast {...selectedLocation} setBackgroundColor={setBackgroundColor} />
        </>
      )}
      <BlurView intensity={blurIntensity} style={[StyleSheet.absoluteFill, {paddingTop: 50}]}>
        <SearchBar
          {...searchBarProps}
          clearIcon={searchBarValue.length > 0}
          containerStyle={{ backgroundColor: 'transparent', paddingBottom: 0, paddingTop: 0 }}
          placeholder="Search Cities"
          platform={Platform.OS}
          ref={searchBar}
        />
        {searchBarValue.length > 0 && <Locations locations={locations} onLocationSelect={onLocationSelect} />}
      </BlurView>
    </SafeAreaView>
  );
};

export default App;
