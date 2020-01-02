import { useEffect, useState } from 'react';
import { GooglePlacesCity } from '../definitions';
import API from '../API';

export default (query: string) => {
  const [locations, setLocations] = useState<GooglePlacesCity[]>([]);

  useEffect(() => {
    const fetchCities = async () => {
      if (!query) {
        setLocations([]);
        return;
      }
      try {
        const response = await API.getCities(query);
        setLocations(response);
      } catch {}
    };
    fetchCities();
  }, [query]);

  return locations;
};
