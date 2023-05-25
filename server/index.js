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

const serializeWeatherData = ({ main, sys, wind, weather, name, id }) => {
  const currentDate = new Date();

  // Get only the needed data for the UI to render
  return {
    id,
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

const serializeForecastData = ({ list }) => {
  return (
    list
      // Get only the needed data for the UI to render
      .map((item) => {
        return {
          temperature: `${Math.round(item.main.temp, 10)}`,
          main: item.weather[0].main,
          day: new Date(item.dt_txt).toLocaleString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          }),
          hour: new Date(item.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      })
      // Group data based on the same day in order for data shape to reflect the rendered UI
      .reduce((result, item) => {
        const value = item.day;
        if (result.hasOwnProperty(value)) {
          result[value].push(item);
        } else {
          result[value] = [item];
        }
        return result;
      }, {})
  );
};

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
        .status(parseInt(weatherData.cod))
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
        .status(parseInt(forecastData.cod))
        .json({ error: forecastData.message });
    }
  } catch (error) {
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
