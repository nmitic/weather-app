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

export const SkeletonForecast = () => {
  return (
    <div role="status" className="animate-pulse">
      {[...new Array(5).keys()].map((item) => {
        return (
          <div className="flex text-center overflow-scroll mb-16" key={item}>
            {[...new Array(8).keys()].map((item) => {
              return (
                <div className="mr-2" key={item}>
                  <div className="h-4 w-20 bg-gray-300 rounded-lg mb-4 mx-auto"></div>
                  <div className="h-8 w-8 bg-gray-300 rounded-lg mb-4 mx-auto"></div>
                  <div className="h-6 w-6 bg-gray-300 rounded-lg mx-auto"></div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};
