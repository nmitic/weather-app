import { DESC_TO_ICON_MAP } from "../../../LocationWeatherView";
import { Clear } from "../../../../../icons/weather_icons/animated/clear";

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
            <div className="mr-2" key={item.hour}>
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
