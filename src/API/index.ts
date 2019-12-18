const API_KEY = '8071a9ff96d7b0980a972cb51681aa53';

export default {
  getCities: async (query: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}&types=(cities)&key=AIzaSyCFywVpnB4GhePAcTTkC2tWlj9p-FLLL7s`;
    return Promise.resolve([
      {
         "description": "Kalamazoo, MI, USA",
         "id": "ca42217ee19b6af0a15942f24cb129923a6b477e",
         "matched_substrings": [
            {
               "length": 4,
               "offset": 0
            }
         ],
         "place_id": "ChIJuZIxSXmdF4gRCTBXSdL4fNo",
         "reference": "ChIJuZIxSXmdF4gRCTBXSdL4fNo",
         "structured_formatting": {
            "main_text": "Kalamazoo",
            "main_text_matched_substrings": [
               {
                  "length": 4,
                  "offset": 0
               }
            ],
            "secondary_text": "MI, USA"
         },
         "terms": [
            {
               "offset": 0,
               "value": "Kalamazoo"
            },
            {
               "offset": 11,
               "value": "MI"
            },
            {
               "offset": 15,
               "value": "USA"
            }
         ],
         "types": [
            "locality",
            "political",
            "geocode"
         ]
      },
      {
         "description": "Kalama, WA, USA",
         "id": "d868f80ed85a01da917381c3c1dc91a7cea0acdb",
         "matched_substrings": [
            {
               "length": 4,
               "offset": 0
            }
         ],
         "place_id": "ChIJ7fdvzGZBlFQRnUSSz30Zu54",
         "reference": "ChIJ7fdvzGZBlFQRnUSSz30Zu54",
         "structured_formatting": {
            "main_text": "Kalama",
            "main_text_matched_substrings": [
               {
                  "length": 4,
                  "offset": 0
               }
            ],
            "secondary_text": "WA, USA"
         },
         "terms": [
            {
               "offset": 0,
               "value": "Kalama"
            },
            {
               "offset": 8,
               "value": "WA"
            },
            {
               "offset": 12,
               "value": "USA"
            }
         ],
         "types": [
            "locality",
            "political",
            "geocode"
         ]
      },
      {
         "description": "Kalamata, Greece",
         "id": "210fee0e6697702a9f2f4459385909ac85497a68",
         "matched_substrings": [
            {
               "length": 4,
               "offset": 0
            }
         ],
         "place_id": "ChIJKXhLYpmwYRMRnl9ice2VH_w",
         "reference": "ChIJKXhLYpmwYRMRnl9ice2VH_w",
         "structured_formatting": {
            "main_text": "Kalamata",
            "main_text_matched_substrings": [
               {
                  "length": 4,
                  "offset": 0
               }
            ],
            "secondary_text": "Greece"
         },
         "terms": [
            {
               "offset": 0,
               "value": "Kalamata"
            },
            {
               "offset": 10,
               "value": "Greece"
            }
         ],
         "types": [
            "locality",
            "political",
            "geocode"
         ]
      },
      {
         "description": "Kalapani, Nepal",
         "id": "22e7d725c9a8a5f63cd4b9c5ea5d29e0edb9336d",
         "matched_substrings": [
            {
               "length": 4,
               "offset": 0
            }
         ],
         "place_id": "ChIJxYvc4xIipDkRtaCkEyZpN0g",
         "reference": "ChIJxYvc4xIipDkRtaCkEyZpN0g",
         "structured_formatting": {
            "main_text": "Kalapani",
            "main_text_matched_substrings": [
               {
                  "length": 4,
                  "offset": 0
               }
            ],
            "secondary_text": "Nepal"
         },
         "terms": [
            {
               "offset": 0,
               "value": "Kalapani"
            },
            {
               "offset": 10,
               "value": "Nepal"
            }
         ],
         "types": [
            "locality",
            "political",
            "geocode"
         ]
      },
      {
         "description": "Kalaloch, WA, USA",
         "id": "e127fd3bdcc7e6dc2a2dde4dfa740ea4b6e19a08",
         "matched_substrings": [
            {
               "length": 4,
               "offset": 0
            }
         ],
         "place_id": "ChIJd3Ze2tTmjVQR_QSebYE-9U8",
         "reference": "ChIJd3Ze2tTmjVQR_QSebYE-9U8",
         "structured_formatting": {
            "main_text": "Kalaloch",
            "main_text_matched_substrings": [
               {
                  "length": 4,
                  "offset": 0
               }
            ],
            "secondary_text": "WA, USA"
         },
         "terms": [
            {
               "offset": 0,
               "value": "Kalaloch"
            },
            {
               "offset": 10,
               "value": "WA"
            },
            {
               "offset": 14,
               "value": "USA"
            }
         ],
         "types": [
            "locality",
            "political",
            "geocode"
         ]
      }
   ]);
    // try {
    //   const response = await fetch(url);
    //   if (response.ok) {
    //     const { predictions } = await response.json();
    //     return predictions;
    //   }
    // } catch {}
  },
  getForecast: async (latitude: number, longitude: number) => {
    const requestURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${API_KEY}`;
    try {
      const response = await fetch(requestURL);
      if (response.ok) {
        const { main, weather } = await response.json();
        return {
          data: {
            description: weather[0].main,
            icon: `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`,
            temperature: Math.round(main.temp),
          },
          error: null,
        };
      }
      throw Error();
    } catch(error) {
      return { data: null, error: "Could not fetch weather data at this time." };
    }
  },
  getLocationDetail: async (placeId: string) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=AIzaSyCFywVpnB4GhePAcTTkC2tWlj9p-FLLL7s`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const { result } = await response.json();
        const { lat: latitude, lng: longitude } = result.geometry.location;
        return { latitude, longitude, city: result.name };
      }
    } catch {}
  },
};
