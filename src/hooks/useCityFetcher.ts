import { useEffect, useState } from 'react';
import { GooglePlacesLocation } from '../definitions';
import API from '../API';

export default (query: string) => {
  const [locations, setLocations] = useState<GooglePlacesLocation[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!query) {
        setLocations([]);
        return;
      }
      setLocations(await API.getCities(query));
    };
    fetchCities();
  }, [query]);

  return locations;
};
