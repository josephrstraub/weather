export interface ForecastDefinition {
  description: string;
  icon: string;
  temperature: number;
}

export interface GeolocationCoordinates {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface GooglePlacesCity {
  description: string;
  id: string;
  matched_substrings: {
    length: number;
    offset: number;
  }[];
  place_id: string;
  reference: string;
  structured_formatting: {
    main_text: string;
    main_text_matched_substrings: {
      length: number;
      offset: number;
    }[];
    secondary_text: string;
  };
  terms: {
    offset: number;
    value: string;
  }[];
  types: string[];
}

export interface Location {
  city: string;
  latitude: number;
  longitude: number;
}

export type Color = string;
