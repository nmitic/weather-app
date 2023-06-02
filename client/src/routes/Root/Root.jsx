import { useLoaderData, Await, defer, useAsyncError } from "react-router-dom";
import {
  LocationWeatherView,
  SkeletonWeather,
} from "../../components/LocationWeatherView/LocationWeatherView";
import {
  Forecast,
  SkeletonForecast,
} from "../../components/LocationWeatherView/components/Forecast/Forecast";
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Seems like we have some troubles retrieving data at this moment"
        );
      }),

    forecastWeather: position
      .then((position) => position.coords)
      .then((cords) =>
        fetch(
          `http://localhost:3001/forecast?lat=${cords.latitude}&lon=${cords.longitude}&units=metric`
        ).then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(
            "Seems like we have some troubles retrieving data at this moment"
          );
        })
      ),
  });
};

const ErrorMsg = () => {
  const error = useAsyncError();

  return (
    <div>
      <button
        className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={() => window.location.reload()}
      >
        Try Again
      </button>
      {error.message}
    </div>
  );
};

const Root = () => {
  const data = useLoaderData();

  return (
    <div className="px-7 max-w-3xl m-auto">
      <React.Suspense fallback={<SkeletonWeather />}>
        <Await resolve={data.currentWeather} errorElement={<ErrorMsg />}>
          {(currentWeather) => (
            <LocationWeatherView weatherData={currentWeather} />
          )}
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<SkeletonForecast />}>
        <Await resolve={data.forecastWeather} errorElement={<ErrorMsg />}>
          {(forecastWeather) => <Forecast forecastData={forecastWeather} />}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default Root;
