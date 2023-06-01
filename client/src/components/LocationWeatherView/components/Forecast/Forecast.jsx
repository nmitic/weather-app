import { DayForecast } from "./components/DayForecast";

export const Forecast = ({ forecastData }) => {
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
