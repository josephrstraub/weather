import React from 'react';
import * as LocationService from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import { render, wait } from '@testing-library/react-native';
import App from './App.tsx';

describe('App Component', () => {
  beforeEach(jest.resetAllMocks);

  it('should check location permissions on mount', () => {
    render(<App />);
    expect(Permissions.askAsync).toHaveBeenCalledWith(Permissions.LOCATION);
  });

  it('should fetch current location data if the location permission has been granted', async () => {
    render(<App />);
    await wait(() => {
      expect(LocationService.getCurrentPositionAsync).toHaveBeenCalledWith({});
    });
  });

  it('should not fetch current location data if the location permission has not been granted', () => {
    Permissions.askAsync.mockResolvedValueOnce({ status: 'denied' });
    render(<App />);
    expect(LocationService.getCurrentPositionAsync).not.toHaveBeenCalled();
  });

  it('should display an alert prompting the user to enable location services if the location permission has not been granted', () => {
    render(<App />);
    const alertSpy = jest.spyOn(Alert, 'alert');
    expect(alertSpy).toHaveBeenCalledWith(
      'Location Access',
      `Please enabled location permissions for this application in your device's settings.`,
    );
  });
});
