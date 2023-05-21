import { LocationWeatherView } from "../Root/Root";
import { useLoaderData } from "react-router-dom";

export const LocationDetailLoader = async ({ params }) => {
  const geoLocationResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${params.locationName}&appid=d780a5117de2228e0d4e559b2dc0bd60`
  );

  const geoLocation = await geoLocationResponse.json();

  console.log(geoLocation);

  const weatherDataResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation[0].lat}&lon=${geoLocation[0].lon}&appid=d780a5117de2228e0d4e559b2dc0bd60&units=metric`
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
