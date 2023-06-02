import { Clear } from "../../icons/weather_icons/animated/clear";
import { Clouds } from "../../icons/weather_icons/animated/cloudy";
import { Thunderstorm } from "../../icons/weather_icons/animated/thunder";
import { Snow } from "../../icons/weather_icons/animated/snow";
import { Rain } from "../../icons/weather_icons/animated/rain";

import { Header } from "./components/Header";
import { MainWeatherInfo } from "./components/MainWeatherInfo";
import { MetaWeatherInfo } from "./components/MetaWeatherInfo";

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
    <>
      <Header city={city} country={country} date={date} />
      <MainWeatherInfo
        temperature={temperature}
        icon={mainWeatherInfoIcon}
        description={description}
      />
      <MetaWeatherInfo wind={wind} humidity={humidity} pressure={pressure} />
    </>
  );
};

export const SkeletonWeather = () => {
  return (
    <div role="status" className="animate-pulse mb-5">
      <div className="flex justify-between py-4 mb-10">
        <div className=" h-8 w-20 bg-gray-300 rounded-lg"></div>
        <div className=" h-8 w-8 bg-gray-300 rounded-lg"></div>
      </div>
      <div className="flex flex-col items-center">
        <div className="h-32 w-32 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-20 w-20 bg-gray-300 rounded-lg mb-4"></div>
        <div className="h-8 w-20 bg-gray-300 rounded-lg mb-4"></div>
      </div>
      <div className=" h-16 w-full bg-gray-300 rounded-lg"></div>
    </div>
  );
};
