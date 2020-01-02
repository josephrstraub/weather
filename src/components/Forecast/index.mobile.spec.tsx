import React from 'react';
import { render, wait } from '@testing-library/react-native';
import Forecast from '.';

// jest.mock('../../API', () => ({
//   getCurrentWeather: jest.fn(() => ({
//     data: {
//       description: 'Clouds',
//       icon: 'http://openweathermap.org/img/wn/03d@2x.png',
//       temperature: 72,
//     },
//     error: null,
//   })),
// }));

// jest.mock('../../API', () => ({
//   __esModule: true,
//   default: {
//     getCurrentWeather: jest.fn(() => ({
//       data: {
//         description: 'Clouds',
//         icon: 'http://openweathermap.org/img/wn/03d@2x.png',
//         temperature: 72,
//       },
//       error: null,
//     })),
//   },
// }));

const props = {
  latitude: 28.079929,
  longitude: -80.603523,
  setBackgroundColor: () => {},
};

describe('Forecast Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.only('should check location permissions on mount', async () => {
    render(<Forecast {...props} />);
    expect(Permissions.askAsync).toHaveBeenCalledWith(Permissions.LOCATION);
  });

  it('should initially fetch forecast data for the given coordinates', async () => {
    jest.doMock('../../API', () => ({
      __esModule: true,
      default: {
        getCurrentWeather: jest.fn(() => ({
          data: {
            description: 'Clouds',
            icon: 'http://openweathermap.org/img/wn/03d@2x.png',
            temperature: 72,
          },
          error: null,
        })),
      },
    }));
    const API = await import('../../API');
    render(<Forecast {...props} />);
    expect(API.default.getCurrentWeather).toHaveBeenCalledWith(props.latitude, props.longitude);
  });

  it('should refetch forecast data when the coordinates change', () => {
    const { rerender } = render(<Forecast {...props} />);
    const newProps = {
      ...props,
      latitude: 29.079929,
      longitude: -79.603523,
    };
    rerender(<Forecast {...newProps} />);
    expect(API.getCurrentWeather).toHaveBeenLastCalledWith(newProps.latitude, newProps.longitude);
  });

  it('should display the temperature for the given coordinates upon successful fetch', async () => {
    const { queryByText } = render(<Forecast {...props} />);
    await wait(() => {
      const temperatureNode = queryByText(/72/);
      expect(temperatureNode).toBeTruthy();
    });
  });

  it('should display the weather conditions description for the given coordinates upon successful fetch', async () => {
    const { queryByText } = render(<Forecast {...props} />);
    await wait(() => {
      const weatherConditionsNode = queryByText('Clouds');
      expect(weatherConditionsNode).toBeTruthy();
    });
  });

  it('should set the background color upon successful fetch', async () => {
    const customProps = { ...props, setBackgroundColor: jest.fn() };
    render(<Forecast {...customProps} />);
    await wait(() => {
      expect(customProps.setBackgroundColor).toHaveBeenCalled();
    });
  });

  it('should display an error message if the forecast data fetch fails', async () => {
    jest.doMock('../../API', () => ({
      __esModule: true,
      default: {
        getCurrentWeather: jest.fn(() => ({
          data: null,
          error: 'Could not fetch weather data at this time.',
        })),
      },
    }));
    const { queryByText } = render(<Forecast {...props} />);
    await wait(() => {
      const errorMessageNode = queryByText('Could not fetch weather data at this time.');
      expect(errorMessageNode).toBeTruthy();
    });
  });
});
