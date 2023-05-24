const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const WEATHER_APP_ID = "d780a5117de2228e0d4e559b2dc0bd60";
const ENDPOINTS = {
  WEATHER: function (query) {
    return `https://api.openweathermap.org/data/2.5/weather?&appid=${WEATHER_APP_ID}&${query}`;
  },
  FORECAST: function (query) {
    return `https://api.openweathermap.org/data/2.5/forecast?l&appid=${WEATHER_APP_ID}&${query}`;
  },
};
const CLIENT_URL = "http://localhost:3000";

const whitelist = [CLIENT_URL];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

/**
 *
 * {
 * city,
 * country,
 * temperature,
 * description,
 * wind,
 * humudity,
 * pressure,
 * [{time, temp, desc}]
 * }
 *
 */

const serializeWeatherData = ({ main, sys, wind, weather, name }) => {
  const currentDate = new Date();

  return {
    city: name,
    country: sys.country,
    temperature: `${Math.round(main.temp, 10)}°`,
    humidity: `${main.humidity}%`,
    pressure: `${main.pressure}hPa`,
    wind: `${wind.speed}km/h`,
    description: weather[0].description,
    main: weather[0].main,
    date: currentDate.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }),
  };
};

app.get("/weather", async (req, res, next) => {
  const qs = new URLSearchParams(req.query);
  const weatherDataResponse = await fetch(ENDPOINTS.WEATHER(qs.toString()));

  const weatherData = await weatherDataResponse.json();
  const serializedWeatherData = serializeWeatherData(weatherData);

  res.json(serializedWeatherData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
