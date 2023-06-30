import React from "react";
import { useLoaderData, Await, defer } from "react-router-dom";

import { AsyncErrorMessage } from "../../components/AsyncErrorMessage";
import {
  LocationWeatherView,
  SkeletonWeather,
} from "../../components/LocationWeatherView/LocationWeatherView";
import { Forecast, SkeletonForecast } from "../../components/Forecast/Forecast";
import { AirQuality } from "../../components/AirQuality";

export const LocationDetailLoader = async ({ params }) => {
  return defer({
    currentWeather: fetch(
      `${process.env.REACT_APP_HOST_URL}/weather?q=${params.locationName}&units=metric`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(
        "Seems like we have some troubles retrieving data at this moment"
      );
    }),

    forecastWeather: fetch(
      `${process.env.REACT_APP_HOST_URL}/forecast?q=${params.locationName}&units=metric`
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(
        "Seems like we have some troubles retrieving data at this moment"
      );
    }),
    airPollution: fetch(
      `${process.env.REACT_APP_HOST_URL}/geo?q=${params.locationName}&units=metric`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Seems like we have some troubles retrieving data at this moment"
        );
      })
      .then((geoData) => {
        const { lat, lon } = geoData?.[0];
        return fetch(
          `${process.env.REACT_APP_HOST_URL}/air_pollution?lat=${lat}&lon=${lon}&units=metric`
        );
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(
          "Seems like we have some troubles retrieving data at this moment"
        );
      }),
  });
};

const LocationDetail = () => {
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

      <React.Suspense fallback={<div>...loading airPollution</div>}>
        <Await resolve={data.airPollution} errorElement={<AsyncErrorMessage />}>
          {(airPollution) => <AirQuality airQualityData={airPollution} />}
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

export default LocationDetail;
