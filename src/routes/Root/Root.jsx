import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { Link, useLoaderData } from "react-router-dom";
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

export const LocationWeatherView = ({ weatherData }) => {
  console.log(weatherData);
  return (
    <>
      <Header
        city={weatherData.name}
        country={weatherData.sys.country}
        date="Fri, 19 May"
      />
      <MainWeatherInfo
        temperature={weatherData.main.temp}
        icon={WeatherLogo}
        description="very much sunny"
      />
      <MetaWeatherInfo wind="20km/h" humidity="90%" pressure="1005 hPa" />
      <CurrentDayForecast
        data={[{ time: "12:00", icon: "sun", temperature: "17" }]}
      />
    </>
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
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d780a5117de2228e0d4e559b2dc0bd60&units=metric`
  );
  const weatherData = await weatherDataResponse.json();

  return weatherData;
};

const Root = () => {
  const weatherData = useLoaderData();

  return <LocationWeatherView weatherData={weatherData} />;
};

export default Root;
