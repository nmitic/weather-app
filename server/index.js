const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/weather/:location", async (req, res) => {
  const geoLocationResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${req.params.location}&appid=d780a5117de2228e0d4e559b2dc0bd60`
  );

  const geoLocation = await geoLocationResponse.json();

  const weatherDataResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation[0].lat}&lon=${geoLocation[0].lon}&appid=d780a5117de2228e0d4e559b2dc0bd60&units=metric`
  );
  const weatherData = await weatherDataResponse.json();

  res.json({ weatherData });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
