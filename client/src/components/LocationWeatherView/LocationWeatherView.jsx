import { Clear } from "../../icons/weather_icons/animated/clear";
import { Clouds } from "../../icons/weather_icons/animated/cloudy";
import { Thunderstorm } from "../../icons/weather_icons/animated/thunder";
import { Snow } from "../../icons/weather_icons/animated/snow";
import { Rain } from "../../icons/weather_icons/animated/rain";

import { Header } from "./components/Header";
import { MainWeatherInfo } from "./components/MainWeatherInfo";
import { MetaWeatherInfo } from "./components/MetaWeatherInfo";
import { Forecast } from "./components/Forecast/Forecast";

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
    <div className="px-7 max-w-3xl m-auto">
      <Header city={city} country={country} date={date} />
      <MainWeatherInfo
        temperature={temperature}
        icon={mainWeatherInfoIcon}
        description={description}
      />
      <MetaWeatherInfo wind={wind} humidity={humidity} pressure={pressure} />
    </div>
  );
};
