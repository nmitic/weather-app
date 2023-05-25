import { useEffect, useState } from "react";
import { LocationsGridList } from "./components/LocationGridList/LocationGridList";
import { LocationsHeader } from "./components/LocationHeader";

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error retrieving data from local storage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Error storing data in local storage:", error);
    }
  }, [key, state]);

  return [state, setState];
};

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
