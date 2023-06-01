import { useLoaderData, Await, defer, useAsyncError } from "react-router-dom";
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

const Error = () => {
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
      <React.Suspense
        fallback={<p>Loading current weather location data...</p>}
      >
        <Await resolve={data.currentWeather} errorElement={<Error />}>
          {(currentWeather) => (
            <LocationWeatherView weatherData={currentWeather} />
          )}
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<p>Loading forecastWeather...</p>}>
        <Await resolve={data.forecastWeather} errorElement={<Error />}>
          {(forecastWeather) => <Forecast forecastData={forecastWeather} />}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default Root;
