import { ReactComponent as ArrowLeftIcon } from "../../icons/arrow_left.svg";
import { Link } from "react-router-dom";
import { ReactComponent as WeatherLogo } from "../../icons/weather_icons/static/cloudy-day-2.svg";

export const LocationItem = ({ data }) => {
  return (
    <Link className="bg-white rounded-3xl p-4" to="/locations/lima">
      <div className="flex justify-between">
        <div className="inline-flex flex-col">
          <span className="text-base text-gray-600">{data.city}</span>
          <span className="text-gray-300 text-sm">{data.countryCode}</span>
        </div>
        <div className="text-gray-600 text-2xl">{data.temperature}°</div>
      </div>
      <WeatherLogo />
    </Link>
  );
};

export const LocationsGridList = ({ data }) => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {data.map((locationData) => {
        return <LocationItem data={locationData} />;
      })}
    </section>
  );
};

export const LocationsHeader = () => {
  return (
    <header className="flex flex-row justify-between py-4 mb-5">
      <h1 className="text-gray-500">Saved Locations</h1>
      <Link to="/">
        <ArrowLeftIcon className="stroke-gray-500" />
      </Link>
    </header>
  );
};

const Locations = () => {
  return (
    <div className="px-7">
      <LocationsHeader />
      <LocationsGridList
        data={[
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
        ]}
      />
    </div>
  );
};

export default Locations;
