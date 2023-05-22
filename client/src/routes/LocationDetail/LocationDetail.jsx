import { LocationWeatherView } from "../Root/Root";
import { useLoaderData } from "react-router-dom";

export const LocationDetailLoader = async ({ params }) => {
  const weatherDataResponse = await fetch(
    `http://localhost:3001/weather/${params.locationName}`
  );
  const weatherData = await weatherDataResponse.json();

  return weatherData;
};

const LocationDetail = () => {
  const weatherData = useLoaderData();

  return (
    <>
      <LocationWeatherView weatherData={weatherData} />
    </>
  );
};

export default LocationDetail;
