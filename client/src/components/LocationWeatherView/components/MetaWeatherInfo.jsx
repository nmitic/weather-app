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
