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

/**
 * @param { Promise } promise
 * @param { Object } improved - If you need to enhance the error.
 * @return { Promise }
 */
function to(promise, improved) {
  return promise
    .then((data) => [null, data])
    .catch((err) => {
      if (improved) {
        Object.assign(err, improved);
      }

      return [err]; // which is same as [err, undefined];
    });
}

app.get("/weather/:location", async (req, res, next) => {
  const [geoLocationError, geoLocationResponse] = await to(
    fetch(ENDPOINTS.GEO_LOC(req.params.location))
  );

  if (geoLocationError) {
    console.error(geoLocationError);
    next(geoLocationError);
  }

  const geoLocation = await geoLocationResponse.json();

  const [weatherDataError, weatherDataResponse] = await to(
    fetch(ENDPOINTS.CURRENT_WEATHER(geoLocation[0].lat, geoLocation[0].lon))
  );

  if (weatherDataError) {
    console.error(geoLocationError);
    next(weatherDataError);
  }

  const weatherData = await weatherDataResponse.json();

  res.json(weatherData);
});

app.get("/weather", async (req, res, next) => {
  const [weatherDataError, weatherDataResponse] = await to(
    fetch(ENDPOINTS.CURRENT_WEATHER(req.query.lat, req.query.lon))
  );

  if (weatherDataError) {
    console.error(geoLocationError);
    next(weatherDataError);
  }

  const weatherData = await weatherDataResponse.json();

  res.json(weatherData);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
