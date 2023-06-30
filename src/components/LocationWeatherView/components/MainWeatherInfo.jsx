export const MainWeatherInfo = ({ temperature, icon: Icon, description }) => {
  return (
    <section className="text-center mb-5">
      <div className="h-60 relative">
        <Icon className="w-96 h-96 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="text-gray-600 text-6xl mb-4">{temperature}</div>
      <div className="text-gray-600 text-2xl">{description}</div>
    </section>
  );
};
