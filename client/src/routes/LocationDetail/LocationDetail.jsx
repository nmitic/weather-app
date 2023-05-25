import { useLoaderData } from "react-router-dom";
import { LocationWeatherView } from "../../components/LocationWeatherView/LocationWeatherView";

export const LocationDetailLoader = async ({ params }) => {
  try {
    const weatherDataResponse = await fetch(
      `http://localhost:3001/weather?q=${params.locationName}&units=metric`
    );
    const weatherData = await weatherDataResponse.json();

    return weatherData;
  } catch (error) {
    console.log(error);
  }
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
