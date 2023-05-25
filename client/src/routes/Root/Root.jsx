import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { Clear } from "../../icons/weather_icons/animated/clear";
import { Clouds } from "../../icons/weather_icons/animated/cloudy";
import { Thunderstorm } from "../../icons/weather_icons/animated/thunder";
import { Snow } from "../../icons/weather_icons/animated/snow";
import { Rain } from "../../icons/weather_icons/animated/rain";

import { Link, useLoaderData } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export const DESC_TO_ICON_MAP = {
  Thunderstorm,
  Rain,
  Snow,
  Clear,
  Clouds,
  // Setting default to sun for the rest of the mapping as I am missing assets for it
  Mist: Clear,
  Tornado: Clear,
  Drizzle: Clear,
  Smoke: Clear,
  Haze: Clear,
  Dust: Clear,
  Fog: Clear,
  Sand: Clear,
  Ash: Clear,
  Squall: Clear,
};

export const Header = ({ city, country, date }) => {
  return (
    <header className="flex flex-row justify-between py-4 mb-5 relative z-50">
      <div>
        <h1 className="text-gray-500">
          {city}, {country}
        </h1>
        <h3 className="text-gray-300 text-sm">{date}</h3>
      </div>
      <Link to="/locations">
        <MenuIcon className="stroke-gray-500" />
      </Link>
    </header>
  );
};

export const MainWeatherInfo = ({ temperature, icon: Icon, description }) => {
  return (
    <section className="text-center mb-5">
      <div className="h-60 relative">
        <Icon className="w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-gray-600 text-6xl mb-4">{temperature}</div>
      <div className="text-gray-600 text-2xl">{description}</div>
    </section>
  );
};

export const MetaWeatherInfo = ({ wind, humidity, pressure }) => {
  return (
    <section className="flex bg-white rounded-xl justify-around py-2 mb-6">
      <div className="inline-flex flex-col items-center">
        <div className="text-gray-300 text-sm">Wind</div>
        <div className="text-base text-gray-600">{wind}</div>
      </div>
      <div className="inline-flex flex-col items-center">
        <div className="text-gray-300 text-sm">Humidity</div>
        <div className="text-base text-gray-600">{humidity}</div>
      </div>
      <div className="inline-flex flex-col items-center">
        <div className="text-gray-300 text-sm">Pressure</div>
        <div className="text-base text-gray-600">{pressure}</div>
      </div>
    </section>
  );
};

export const DayForecast = ({ day, forecastList }) => {
  return (
    <section className=" mb-16">
      <div className="text-gray-300 text-sm mb-3">{day}</div>
      <div className="flex text-center overflow-scroll">
        {forecastList.map((item) => {
          const WeatherIcon = DESC_TO_ICON_MAP[item.main]
            ? DESC_TO_ICON_MAP[item.main]
            : Clear;

          return (
            <div className="mr-2">
              {item.hour}
              <WeatherIcon className=" w-20 h-20" />
              {item.temperature}°
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const Forecast = ({ location }) => {
  const [forecastData, setForecastData] = useState({});

  const fetchForecast = useCallback(async () => {
    const forecastResponse = await fetch(
      `http://localhost:3001/forecast?q=${location}&units=metric`
    );
    const forecastResponseData = await forecastResponse.json();
    setForecastData(forecastResponseData);
  }, [location]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  if (!forecastData) {
    return undefined;
  }

  return (
    <section>
      {Object.keys(forecastData).map((key) => {
        return <DayForecast day={key} forecastList={forecastData[key]} />;
      })}
    </section>
  );
};

export const LocationWeatherView = ({
  weatherData: {
    city,
    country,
    temperature,
    description,
    wind,
    pressure,
    humidity,
    main,
    date,
  },
}) => {
  const mainWeatherInfoIcon = DESC_TO_ICON_MAP[main]
    ? DESC_TO_ICON_MAP[main]
    : Clear;
  return (
    <div className="px-7 max-w-3xl m-auto">
      <Header city={city} country={country} date={date} />
      <MainWeatherInfo
        temperature={temperature}
        icon={mainWeatherInfoIcon}
        description={description}
      />
      <MetaWeatherInfo wind={wind} humidity={humidity} pressure={pressure} />
      <Forecast location={city} />
    </div>
  );
};

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
