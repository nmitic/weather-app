import { useEffect, useCallback, useState } from "react";
import { DayForecast } from "./components/DayForecast";

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
        return (
          <DayForecast day={key} forecastList={forecastData[key]} key={key} />
        );
      })}
    </section>
  );
};
