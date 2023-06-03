import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ReactComponent as AddIcon } from "../../../../../icons/add.svg";

export const AddNewLocationItem = ({ setSavedLocations, savedLocations }) => {
  const [inputShow, setInputShown] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSavedLocations([
      ...savedLocations,
      { name: e.target.elements.location.value, id: uuidv4() },
    ]);
    setInputShown(false);
  };

  return (
    <div
      className="bg-white rounded-3xl p-4 text-left flex flex-col justify-between min-h-[160px]"
      onClick={() => setInputShown(true)}
      onKeyUp={(event) => {
        if (event.key === "Enter") {
          setInputShown(true);
        }
      }}
      role="button"
      tabIndex="0"
    >
      <div className="text-gray-300 text-sm">ADD NEW LOCATION</div>
      {inputShow ? (
        <>
          <form
            onSubmit={handleFormSubmit}
            className=" inline-flex w-full"
            data-testid="form"
          >
            <input
              data-testid="input"
              onBlur={() => setInputShown(false)}
              autoFocus
              type="text"
              name="location"
              className=" mr-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <button type="submit">
              <AddIcon className="stroke-gray-500" />
            </button>
          </form>
        </>
      ) : (
        <div className=" inline-flex justify-end">
          <AddIcon className="stroke-gray-500" />
        </div>
      )}
    </div>
  );
};
