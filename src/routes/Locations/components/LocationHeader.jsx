import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeftIcon } from "../../../icons/arrow_left.svg";

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
