import { ReactComponent as ArrowLeftIcon } from "../../icons/arrow_left.svg";
import { ReactComponent as RefreshIcon } from "../../icons/refresh.svg";
import { ReactComponent as AddIcon } from "../../icons/add.svg";
import { ReactComponent as RemoveIcon } from "../../icons/remove.svg";
import { DESC_TO_ICON_MAP } from "../Root/Root";
import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

export const LocationItem = ({ location, handleRemove }) => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = useCallback(async () => {
    const weatherDataResponse = await fetch(
      `http://localhost:3001/weather?q=${location}&units=metric`
    );
    const weatherData = await weatherDataResponse.json();

    return weatherData;
  }, []);

  useEffect(() => {
    fetchWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  const handleRefresh = useCallback(async () => {
    setWeatherData(null);
    fetchWeatherData()
      .then((data) => setWeatherData(data))
      .catch(console.error);
  }, []);

  if (!weatherData) {
    return (
      <div className="bg-white rounded-3xl p-4">
        <div className="flex justify-between">
          <div className="inline-flex flex-col">
            <span className="bg-gray-200 animate-pulse rounded-md h-5 w-32 mb-2" />
            <span className="bg-gray-200 animate-pulse rounded-md h-5 w-20" />
          </div>
          <div className="bg-gray-200 w-10 h-10 animate-pulse rounded-md" />
        </div>
        <div className="bg-gray-200 animate-pulse rounded-md h-8 w-8 mt-5" />
        <div className="flex justify-end">
          <button disabled>
            <RemoveIcon className="stroke-gray-500 mr-3" />
          </button>
          <button disabled>
            <RefreshIcon className="stroke-gray-500" />
          </button>
        </div>
      </div>
    );
  }

  const WeatherIcon = DESC_TO_ICON_MAP[weatherData.main]
    ? DESC_TO_ICON_MAP[weatherData.main]
    : DESC_TO_ICON_MAP["Clear"];

  return (
    <Link
      className="bg-white rounded-3xl p-4 min-h-[160px]"
      to={`/locations/${location}`}
    >
      <div className="flex justify-between">
        <div className="inline-flex flex-col">
          <span className="text-base text-gray-600">{weatherData.city}</span>
          <span className="text-gray-300 text-sm">{weatherData.country}</span>
        </div>
        <div className="text-gray-600 text-2xl">{weatherData.temperature}</div>
      </div>
      <WeatherIcon />
      <div className="flex justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRemove(location);
          }}
        >
          <RemoveIcon className="stroke-gray-500 mr-3" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleRefresh();
          }}
        >
          <RefreshIcon className="stroke-gray-500" />
        </button>
      </div>
    </Link>
  );
};

export const AddNewLocationItem = ({ onAddNewLocation }) => {
  const [inputShow, setInputShown] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onAddNewLocation(e.target.elements.location.value);
    setInputShown(false);
  };

  const handleInputShow = () => {
    setInputShown(true);
  };

  return (
    <div
      className="bg-white rounded-3xl p-4 text-left flex flex-col justify-between min-h-[160px]"
      onClick={() => handleInputShow()}
      role="button"
      tabIndex="0"
    >
      <div className="text-gray-300 text-sm">ADD NEW LOCATION</div>
      {inputShow ? (
        <>
          <form onSubmit={handleFormSubmit} className=" inline-flex w-full">
            <input
              autoFocus
              type="text"
              name="location"
              className=" mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <button type="submit">
              <AddIcon className="w-10 h-10 stroke-gray-500" />
            </button>
          </form>
        </>
      ) : (
        <AddIcon className=" w-20 h-20 stroke-gray-500" />
      )}
    </div>
  );
};

export const LocationsGridList = ({
  data,
  setSavedLocations,
  handleRemove,
}) => {
  return (
    <section className="grid grid-cols-2 gap-4">
      {data.map((location) => {
        return <LocationItem location={location} handleRemove={handleRemove} />;
      })}
      <AddNewLocationItem
        onAddNewLocation={(newLocation) =>
          setSavedLocations([...data, newLocation])
        }
      />
    </section>
  );
};

export const LocationsHeader = () => {
  const navigate = useNavigate();
  return (
    <header className="flex flex-row justify-between py-4 mb-5">
      <h1 className="text-gray-500">Saved Locations</h1>
      <>
        <button onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="stroke-gray-500" />
        </button>
      </>
    </header>
  );
};

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
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default Locations;
