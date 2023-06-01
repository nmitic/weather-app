import { useLoaderData, Await, defer } from "react-router-dom";
import React from "react";

import { LocationWeatherView } from "../../components/LocationWeatherView/LocationWeatherView";
import { Forecast } from "../../components/LocationWeatherView/components/Forecast/Forecast";

export const LocationDetailLoader = async ({ params }) => {
  return defer({
    currentWeather: fetch(
      `http://localhost:3001/weather?q=${params.locationName}&units=metric`
    ).then((response) => response.json()),

    forecastWeather: fetch(
      `http://localhost:3001/forecast?q=${params.locationName}&units=metric`
    ).then((response) => response.json()),
  });
};

const LocationDetail = () => {
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

export default LocationDetail;
