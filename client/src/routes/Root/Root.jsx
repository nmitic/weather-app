import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";
import { ReactComponent as MenuIcon } from "../../icons/menu.svg";
import { Link, useLoaderData, useNavigation } from "react-router-dom";

export const Header = ({ city, country, date }) => {
  return (
    <header className="flex flex-row justify-between py-4 mb-5">
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
      <div className="h-60 relative overflow-hidden">
        <Icon className="w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-gray-600 text-6xl">{temperature}</div>
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
      <div className="text-gray-300 text-sm mb-3">Today</div>
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

export const LocationWeatherView = ({
  weatherData: {
    city,
    country,
    temperature,
    description,
    wind,
    pressure,
    humidity,
  },
}) => {
  return (
    <div className="px-7">
      <Header city={city} country={country} date="Fri, 19 May" />
      <MainWeatherInfo
        temperature={temperature}
        icon={WeatherLogo}
        description={description}
      />
      <MetaWeatherInfo wind={wind} humidity={humidity} pressure={pressure} />
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
