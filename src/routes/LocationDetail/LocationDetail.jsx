import { LocationWeatherView } from "../Root/Root";
import { useLoaderData } from "react-router-dom";

export const LocationDetailLoader = async ({ params }) => {
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${params.locationName}&appid=d780a5117de2228e0d4e559b2dc0bd60`
  );

  const GeoLocation = await response.json();

  return { GeoLocation };
};

const LocationDetail = () => {
  const { GeoLocation } = useLoaderData();
  const { lat, lon } = GeoLocation[0];

  return (
    <>
      <LocationWeatherView lat={lat} lon={lon} />
    </>
  );
};

export default LocationDetail;
