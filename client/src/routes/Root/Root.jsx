import { useLoaderData } from "react-router-dom";
import { LocationWeatherView } from "../../components/LocationWeatherView/LocationWeatherView";

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

export const rootLoader = async () => {
  const position = await getPosition();
  const { latitude, longitude } = position.coords;
  const weatherDataResponse = await fetch(
    `http://localhost:3001/weather?lat=${latitude}&lon=${longitude}&units=metric`
  );
  const weatherData = await weatherDataResponse.json();

  return weatherData;
};

const Root = () => {
  const weatherData = useLoaderData();

  return <LocationWeatherView weatherData={weatherData} />;
};

export default Root;
