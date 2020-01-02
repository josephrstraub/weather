## Quickstart

#### Clone the repository
```bash
$ git clone https://github.com/josephrstraub/weather.git
```

#### Install dependencies
```bash
$ yarn install
```

#### Get API keys
 1. Create a GCP project.
 2. Create API credentials.
 3. Enable the [Maps](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com?id=fd73ab50-9916-4cde-a0f6-dc8be0a0d425&project=gcp-training-project-234401), [Geocoding](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com?q=Geocoding&id=42fea2de-420b-4bd7-bd89-225be3b8b7b0&project=weather-app-261719), and [Places](https://console.cloud.google.com/apis/library/places-backend.googleapis.com?q=places&id=ecefdd63-ee2b-4751-b6c3-8e9113791baf&project=weather-app-261719) APIs.
 4. Ensure the enabled APIs are also enabled for your created key.

#### Create .env file in project root with the following structure
```
SKIP_PREFLIGHT_CHECK=true
REACT_APP_GOOGLE_API_KEY=<your-google-api-key>
REACT_APP_OPEN_WEATHER_MAP_API_KEY=<your-open-weather-api-key>
```

#### Add the following key/value pair within the 'expo' section of app.json
```
"extra": {
  "apiKeys": {
    "google": "<your-google-api-key>",
    "openWeatherMap": "<your-open-weather-api-key>"
  }
}
```

#### Add the following prior to the closing body tag in public/index.html
```
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=<your-google-api-key>&libraries=places"></script>

```

### Start
```bash
$ yarn run <ios|android|web>
```
