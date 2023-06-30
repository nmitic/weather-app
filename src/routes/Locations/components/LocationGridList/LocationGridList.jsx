import { LocationItem } from "./components/LocationItem";
import { AddNewLocationItem } from "./components/AddNewLocationItem";

export const LocationsGridList = ({
  data,
  setSavedLocations,
  savedLocations,
  handleRemove,
}) => {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {data.map((location) => {
        return (
          <LocationItem
            location={location}
            handleRemove={handleRemove}
            key={location.id}
            setSavedLocations={setSavedLocations}
            savedLocations={savedLocations}
          />
        );
      })}
      <AddNewLocationItem
        setSavedLocations={setSavedLocations}
        savedLocations={savedLocations}
      />
    </section>
  );
};
