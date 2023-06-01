import { useLoaderData, Await, defer } from "react-router-dom";
import { LocationWeatherView } from "../../components/LocationWeatherView/LocationWeatherView";
import React from "react";

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
      .then((response) => response.json())
      .catch((error) => console.log(error)),
  });
};

const Root = () => {
  const data = useLoaderData();

  return (
    <React.Suspense fallback={<p>Loading current weather location data...</p>}>
      <Await
        resolve={data.currentWeather}
        errorElement={<p>Error loading weatherData!</p>}
      >
        {(currentWeather) => (
          <LocationWeatherView weatherData={currentWeather} />
        )}
      </Await>
    </React.Suspense>
  );
};

export default Root;
