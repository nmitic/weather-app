const path = require("path");
const {
  serializeAirPollutionData,
  serializeForecastData,
  serializeWeatherData,
} = require("./data-serializers.js");

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const WEATHER_APP_ID = "d780a5117de2228e0d4e559b2dc0bd60";

// client build path
const buildPath = path.join(path.resolve(), "build");

const ENDPOINTS = {
  WEATHER: function (query) {
    return `https://api.openweathermap.org/data/2.5/weather?&appid=${WEATHER_APP_ID}&${query}`;
  },
  FORECAST: function (query) {
    return `https://api.openweathermap.org/data/2.5/forecast?l&appid=${WEATHER_APP_ID}&${query}`;
  },
  AIR_POLLUTION: function (query) {
    return `https://api.openweathermap.org/data/2.5/air_pollution?&appid=${WEATHER_APP_ID}&${query}`;
  },
  GEO_CODING: function (query) {
    return `http://api.openweathermap.org/geo/1.0/direct?&appid=${WEATHER_APP_ID}&${query}}`;
  },
};

app.use(express.static(buildPath));
app.use(express.json());
app.use(cors());

// gets the static files from the build folder
app.get("/", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});

app.get("/weather", async (req, res, next) => {
  const qs = new URLSearchParams(req.query);

  try {
    const weatherDataResponse = await fetch(ENDPOINTS.WEATHER(qs.toString()));
    const weatherData = await weatherDataResponse.json();
    if (weatherData.cod === 200) {
      const serializedWeatherData = serializeWeatherData(weatherData);
      res.json(serializedWeatherData);
    } else {
      res
        .status(parseInt(weatherData?.cod))
        .json({ error: weatherData.message });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/forecast", async (req, res, next) => {
  const qs = new URLSearchParams(req.query);

  try {
    const forecastDataResponse = await fetch(ENDPOINTS.FORECAST(qs.toString()));
    const forecastData = await forecastDataResponse.json();

    if (forecastData.cod === "200") {
      const serializedForecastData = serializeForecastData(forecastData);
      res.json(serializedForecastData);
    } else {
      res
        .status(parseInt(forecastData?.cod))
        .json({ error: forecastData.message });
    }
  } catch (error) {
    next(error);
  }
});

app.get("/air_pollution", async (req, res, next) => {
  const qs = new URLSearchParams(req.query);
  const airPollutionDataResponse = await fetch(
    ENDPOINTS.AIR_POLLUTION(qs.toString())
  );
  const airPollutionData = await airPollutionDataResponse.json();
  const serializedAirPollutionData =
    serializeAirPollutionData(airPollutionData);
  res.json(serializedAirPollutionData);
});

app.get("/geo", async (req, res, next) => {
  const qs = new URLSearchParams(req.query);
  const geoDataResponse = await fetch(ENDPOINTS.GEO_CODING(qs.toString()));
  const geoData = await geoDataResponse.json();

  res.json(geoData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
