const serializeWeatherData = ({ main, sys, wind, weather, name, id }) => {
  const currentDate = new Date();

  // Get only the needed data for the UI to render
  return {
    id,
    city: name,
    country: sys.country,
    temperature: `${Math.round(main.temp)}°`,
    humidity: `${main.humidity}%`,
    pressure: `${main.pressure}hPa`,
    wind: `${wind.speed}km/h`,
    description: weather[0].description,
    main: weather[0].main,
    date: currentDate.toLocaleString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }),
  };
};

const serializeForecastData = ({ list }) => {
  return (
    list
      // Get only the needed data for the UI to render
      .map((item) => {
        return {
          temperature: `${Math.round(item.main.temp)}`,
          main: item.weather[0].main,
          day: new Date(item.dt_txt).toLocaleString("en-US", {
            weekday: "short",
            day: "2-digit",
            month: "short",
          }),
          hour: new Date(item.dt_txt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      })
      // Group data based on the same day in order for data shape to reflect the rendered UI
      .reduce((result, item) => {
        const value = item.day;
        if (result.hasOwnProperty(value)) {
          result[value].push(item);
        } else {
          result[value] = [item];
        }
        return result;
      }, {})
  );
};

const serializeAirPollutionData = ({ list }) => {
  return {
    airQualityIndex: list?.[0].main.aqi,
    components: list?.[0].components,
  };
};

exports.serializeAirPollutionData = serializeAirPollutionData;
exports.serializeForecastData = serializeForecastData;
exports.serializeWeatherData = serializeWeatherData;
