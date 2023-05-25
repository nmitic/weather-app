import { ReactComponent as RefreshIcon } from "../../../../../icons/refresh.svg";
import { ReactComponent as AddIcon } from "../../../../../icons/add.svg";
import { ReactComponent as RemoveIcon } from "../../../../../icons/remove.svg";
import { ReactComponent as EditIcon } from "../../../../../icons/edit.svg";
import { DESC_TO_ICON_MAP } from "../../../../../components/LocationWeatherView/LocationWeatherView";
import { useEffect, useCallback, useState } from "react";
import { Link } from "react-router-dom";

export const LocationItem = ({
  location,
  handleRemove,
  setSavedLocations,
  savedLocations,
}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const fetchWeatherData = useCallback(async (location) => {
    try {
      const weatherDataResponse = await fetch(
        `http://localhost:3001/weather?q=${location}&units=metric`
      );

      if (!weatherDataResponse.ok) {
        const weatherDataError = await weatherDataResponse.json();
        throw new Error(weatherDataError.error);
      } else {
        const weatherData = await weatherDataResponse.json();
        setWeatherData(weatherData);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    fetchWeatherData(location.name);
  }, [fetchWeatherData, location.name]);

  const handleRefresh = useCallback(
    async (location, id) => {
      setWeatherData(null);
      setErrorMessage(null);
      setSavedLocations(
        savedLocations.map((savedLocation) => {
          if (savedLocation.id === id) {
            return {
              name: location,
              id: savedLocation.id,
            };
          }
          return savedLocation;
        })
      );
      fetchWeatherData(location);
    },
    [fetchWeatherData, savedLocations, setSavedLocations]
  );

  if (editMode) {
    return (
      <div
        className="bg-white rounded-3xl p-4 text-left flex flex-col justify-between min-h-[160px]"
        role="button"
        tabIndex="0"
      >
        <div className="text-gray-300 text-sm">Edit location</div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRefresh(e.target.elements.location.value, location.id);
            setEditMode(false);
          }}
          className=" inline-flex w-full"
        >
          <input
            defaultValue={location.name}
            autoFocus
            type="text"
            name="location"
            className=" mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
          <button type="submit">
            <AddIcon className="stroke-gray-500" />
          </button>
        </form>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-white rounded-3xl p-4 min-h-[160px] flex flex-col justify-between">
        <div className="flex justify-between">{errorMessage}</div>
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
              handleRefresh(location.name, location.id);
            }}
          >
            <RefreshIcon className="stroke-gray-500 mr-3" />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditMode(true);
            }}
          >
            <EditIcon className="stroke-gray-500" />
          </button>
        </div>
      </div>
    );
  }

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
      className="bg-white rounded-3xl p-4 min-h-[160px] hover:scale-125 transition-transform"
      to={`/locations/${location.name}`}
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
            handleRefresh(location.name, location.id);
          }}
        >
          <RefreshIcon className="stroke-gray-500" />
        </button>
      </div>
    </Link>
  );
};
