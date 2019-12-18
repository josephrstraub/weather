const mockPositionData = {
  coords: {
    accuracy: 5,
    altitude: 0,
    altitudeAccuracy: -1,
    heading: -1,
    latitude: 28.079929,
    longitude: -80.603523,
    speed: -1,
  },
  timestamp: Date.now(),
};
export const getCurrentPositionAsync = jest.fn(mockPositionData);
