import { useEffect, useCallback, useState } from "react";
import { DayForecast } from "./components/DayForecast";

export const Forecast = ({ location }) => {
  const [forecastData, setForecastData] = useState(null);

  const fetchForecast = useCallback(async () => {
    try {
      const forecastResponse = await fetch(
        `http://localhost:3001/forecast?q=${location}&units=metric`
      );
      if (!forecastResponse.ok) {
        const forecastDataError = await forecastResponse.json();

        throw new Error(forecastDataError.error);
      }
      const forecastResponseData = await forecastResponse.json();
      setForecastData(forecastResponseData);
    } catch (error) {
      console.log(error.message);
    }
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
