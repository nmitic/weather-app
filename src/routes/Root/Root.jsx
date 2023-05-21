import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = ({ city, country, date }) => {
  return (
    <header className="flex flex-row justify-between px-4 py-4">
      <div>
        <h1 className="text-gray-500">
          {city}, {country}
        </h1>
        <h3 className=" text-gray-300 text-xs">{date}</h3>
      </div>
      <Link to="/locations">
        <MenuIcon />
      </Link>
    </header>
  );
};

export const MainWeatherInfo = ({ temperature, icon: Icon, description }) => {
  return (
    <section>
      <Icon />
      {temperature}
      {description}
    </section>
  );
};

export const MetaWeatherInfo = ({ wind, humidity, pressure }) => {
  return (
    <section>
      {wind}
      {humidity}
      {pressure}
    </section>
  );
};

export const CurrentDayForecast = ({ data }) => {
  return (
    <section>
      {data.map((item) => {
        return (
          <div>
            {item.time}
            {item.icon}
            {item.temperature}
          </div>
        );
      })}
    </section>
  );
};

export const LocationWeatherView = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d780a5117de2228e0d4e559b2dc0bd60&units=metric`
      );
      const data = await response.json();

      setWeatherData(data);
    };

    getWeatherData().catch(console.error);
  }, [lat, lon]);

  if (weatherData) {
    return (
      <>
        <Header
          city={weatherData.city.name}
          country="Serbia"
          date="Fri, 19 May"
        />
        <MainWeatherInfo
          temperature={17}
          icon={WeatherLogo}
          description="very much sunny"
        />
        <MetaWeatherInfo wind="20km/h" humidity="90%" pressure="1005 hPa" />
        <CurrentDayForecast
          data={[{ time: "12:00", icon: "sun", temperature: "17" }]}
        />
      </>
    );
  }

  return (
    <>
      <h1>loading</h1>
    </>
  );
};

const Root = () => {
  return (
    <LocationWeatherView lan="currentFromWebAPI" lon="currentFromWebAPI" />
  );
};

export default Root;
