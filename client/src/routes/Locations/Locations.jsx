import { ReactComponent as ArrowLeftIcon } from "../../icons/arrow_left.svg";
import { Link } from "react-router-dom";

export const LocationItem = ({ data }) => {
  return (
    <div>
      {data.icon}
      {data.temperature}
      {data.city}
      {data.countryCode}
    </div>
  );
};

export const LocationsGridList = ({ data }) => {
  return (
    <section>
      {data.map((locationData) => {
        return <LocationItem data={locationData} />;
      })}
    </section>
  );
};

const Locations = () => {
  return (
    <>
      <header className="flex flex-row justify-between px-4 py-4">
        <h1 className="text-gray-500">Saved Locations</h1>
        <Link to="/">
          <ArrowLeftIcon />
        </Link>
      </header>
      <LocationsGridList
        data={[
          {
            icon: "sun",
            temperature: 18,
            city: "Belgrade",
            countryCode: "SRB",
          },
        ]}
      />
    </>
  );
};

export default Locations;
