import { LocationsGridList } from "./components/LocationGridList/LocationGridList";
import { LocationsHeader } from "./components/LocationHeader";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Locations = () => {
  const [savedLocations, setSavedLocations] = useLocalStorage(
    "saveLocations",
    []
  );

  const handleRemove = (location) => {
    setSavedLocations(savedLocations.filter((item) => item !== location));
  };

  return (
    <div className="px-7 max-w-3xl m-auto">
      <LocationsHeader />
      <LocationsGridList
        data={savedLocations}
        setSavedLocations={setSavedLocations}
        savedLocations={savedLocations}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default Locations;
