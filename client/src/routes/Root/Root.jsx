import React from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import { AsyncErrorMessage } from "../../components/AsyncErrorMessage";
import {
  LocationWeatherView,
  SkeletonWeather,
} from "../../components/LocationWeatherView/LocationWeatherView";
import {
  Forecast,
  SkeletonForecast,
} from "../../components/LocationWeatherView/components/Forecast/Forecast";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const rootLoader = async () => {
  return defer({
    currentWeather: getPosition()
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

    forecastWeather: getPosition()
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

const Root = () => {
  const data = useLoaderData();

  return (
    <div className="px-7 max-w-3xl m-auto">
      <React.Suspense fallback={<SkeletonWeather />}>
        <Await
          resolve={data.currentWeather}
          errorElement={<AsyncErrorMessage />}
        >
          {(currentWeather) => (
            <LocationWeatherView weatherData={currentWeather} />
          )}
        </Await>
      </React.Suspense>

      <React.Suspense fallback={<SkeletonForecast />}>
        <Await
          resolve={data.forecastWeather}
          errorElement={<AsyncErrorMessage />}
        >
          {(forecastWeather) => <Forecast forecastData={forecastWeather} />}
        </Await>
      </React.Suspense>
    </div>
  );
};

export default Root;
