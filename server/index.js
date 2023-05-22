const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

const WEATHER_APP_ID = "d780a5117de2228e0d4e559b2dc0bd60";
const ENDPOINTS = {
  GEO_LOC: function (location) {
    return `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${WEATHER_APP_ID}`;
  },
  CURRENT_WEATHER: function (lat, lon) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_APP_ID}&units=metric`;
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

app.get("/weather/:location", async (req, res) => {
  const geoLocationResponse = await fetch(
    ENDPOINTS.GEO_LOC(req.params.location)
  );

  const geoLocation = await geoLocationResponse.json();

  const weatherDataResponse = await fetch(
    ENDPOINTS.CURRENT_WEATHER(geoLocation[0].lat, geoLocation[0].lon)
  );
  const weatherData = await weatherDataResponse.json();

  res.json(weatherData);
});

app.get("/weather", async (req, res) => {
  const weatherDataResponse = await fetch(
    ENDPOINTS.CURRENT_WEATHER(req.query.lat, req.query.lon)
  );
  const weatherData = await weatherDataResponse.json();

  res.json(weatherData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
