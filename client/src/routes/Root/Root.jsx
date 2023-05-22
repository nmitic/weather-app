import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { Link, useLoaderData } from "react-router-dom";

export const Header = ({ city, country, date }) => {
  return (
    <header className="flex flex-row justify-between px-4 py-4 mb-5">
      <div>
        <h1 className="text-gray-500">
          {city}, {country}
        </h1>
        <h3 className="text-gray-300 text-sm">{date}</h3>
      </div>
      <Link to="/locations">
        <MenuIcon />
      </Link>
    </header>
  );
};

export const MainWeatherInfo = ({ temperature, icon: Icon, description }) => {
  return (
    <section className="text-center mb-5">
      <div className="h-60 relative overflow-hidden">
        <Icon className="w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-gray-600 text-6xl">{temperature}°</div>
      <div className="text-gray-600">{description}</div>
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

export const CurrentDayForecast = ({ data }) => {
  return (
    <section>
      <div className="text-gray-300 text-sm">Today</div>
      <div className="flex text-center overflow-scroll">
        {data.map((item) => {
          return (
            <div>
              {item.time}
              <WeatherLogo />
              {item.temperature}°
            </div>
          );
        })}
      </div>
    </section>
  );
};

export const LocationWeatherView = ({ weatherData }) => {
  return (
    <div className=" px-7">
      <Header city={"Belgrade"} country={"Serbia"} date="Fri, 19 May" />
      <MainWeatherInfo
        temperature={18}
        icon={WeatherLogo}
        description="very much sunny"
      />
      <MetaWeatherInfo wind="20km/h" humidity="90%" pressure="1005 hPa" />
      <CurrentDayForecast
        data={[
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
          { time: "12:00", icon: "sun", temperature: "17" },
        ]}
      />
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
