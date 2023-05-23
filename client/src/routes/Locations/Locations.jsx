import { ReactComponent as ArrowLeftIcon } from "../../icons/arrow_left.svg";
import { ReactComponent as RefreshIcon } from "../../icons/refresh.svg";
import { Link } from "react-router-dom";
import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";
import { useCallback, useEffect, useState } from "react";

export const LocationItem = ({ location }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    const weatherDataResponse = await fetch(
      `http://localhost:3001/weather?q=${location}&units=metric`
    );
    const weatherData = await weatherDataResponse.json();

    return weatherData;
  }, []);

  useEffect(() => {
    fetchWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  const handleRefresh = useCallback(async () => {
    setWeatherData(null);
    fetchWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  if (!weatherData) {
    return (
      <div className="bg-white rounded-3xl p-4">
        <div className="flex justify-between">
          <div className="inline-flex flex-col">
            <span className="bg-gray-200 animate-pulse rounded-md h-5 w-32 mb-2" />
            <span className="bg-gray-200 animate-pulse rounded-md h-5 w-20" />
          </div>
          <div className="bg-gray-200 w-10 h-10 animate-pulse rounded-md" />
        </div>
        <div className="bg-gray-200 animate-pulse rounded-md h-8 w-8 mt-5" />
        <div className="flex justify-end">
          <button disabled>
            <RefreshIcon className="stroke-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <Link className="bg-white rounded-3xl p-4" to={`/locations/${location}`}>
      <div className="flex justify-between">
        <div className="inline-flex flex-col">
          <span className="text-base text-gray-600">{weatherData.city}</span>
          <span className="text-gray-300 text-sm">{weatherData.country}</span>
        </div>
        <div className="text-gray-600 text-2xl">{weatherData.temperature}</div>
      </div>
      <WeatherLogo />
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRefresh();
          }}
        >
          <RefreshIcon className="stroke-gray-500" />
        </button>
      </div>
    </Link>
  );
};

export const LocationsGridList = ({ data }) => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {data.map((location) => {
        return <LocationItem location={location} />;
      })}
    </section>
  );
};

export const LocationsHeader = () => {
  return (
    <header className="flex flex-row justify-between py-4 mb-5">
      <h1 className="text-gray-500">Saved Locations</h1>
      <Link to="/">
        <ArrowLeftIcon className="stroke-gray-500" />
      </Link>
    </header>
  );
};

const Locations = () => {
  return (
    <div className="px-7">
      <LocationsHeader />
      <LocationsGridList
        data={["belgrade", "paris", "dubai", "perth", "lima"]}
      />
    </div>
  );
};

export default Locations;
