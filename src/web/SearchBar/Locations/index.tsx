import React, { FC } from 'react';
import { GooglePlacesLocation } from '../../../definitions';
import styles from './styles';

interface Props {
  locations: GooglePlacesLocation[];
  onLocationSelect: (placeId: string) => void;
}

const Locations: FC<Props> = ({ locations, onLocationSelect }) => (
  <>
    {locations.map(location => (
      <option key={location.place_id} onClick={() => onLocationSelect(location.place_id)} style={styles.container} value={location.description} />
    ))}
  </>
);

export default Locations;
