import { useLoaderData, Await, defer } from "react-router-dom";
import { LocationWeatherView } from "../../components/LocationWeatherView/LocationWeatherView";
import { Forecast } from "../../components/LocationWeatherView/components/Forecast/Forecast";
import React from "react";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const rootLoader = async () => {
  const position = getPosition();
  return defer({
    currentWeather: position
      .then((position) => position.coords)
      .then((cords) =>
        fetch(
          `http://localhost:3001/weather?lat=${cords.latitude}&lon=${cords.longitude}&units=metric`
        )
      )
      .then((response) => response.json()),

    forecastWeather: position
      .then((position) => position.coords)
      .then((cords) =>
        fetch(
          `http://localhost:3001/forecast?lat=${cords.latitude}&lon=${cords.longitude}&units=metric`
        ).then((response) => response.json())
      ),
  });
};

const Root = () => {
  const data = useLoaderData();

  return (
    <>
      <React.Suspense
        fallback={<p>Loading current weather location data...</p>}
      >
        <Await
          resolve={data.currentWeather}
          errorElement={<p>Error loading weatherData!</p>}
        >
          {(currentWeather) => (
            <LocationWeatherView weatherData={currentWeather} />
          )}
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<p>Loading forecastWeather...</p>}>
        <Await
          resolve={data.forecastWeather}
          errorElement={<p>Error loading forecastWeather!</p>}
        >
          {(forecastWeather) => <Forecast forecastData={forecastWeather} />}
        </Await>
      </React.Suspense>
    </>
  );
};

export default Root;
