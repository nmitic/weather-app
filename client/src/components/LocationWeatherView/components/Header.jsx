import { ReactComponent as MenuIcon } from "../../../icons/menu.svg";
import { Link } from "react-router-dom";

export const Header = ({ city, country, date }) => {
  return (
    <header className="flex flex-row justify-between py-4 mb-5 relative z-50">
      <div>
        <h1 className="text-gray-500">
          {city}, {country}
        </h1>
        <h3 className="text-gray-300 text-sm">{date}</h3>
      </div>
      <Link to="/locations">
        <MenuIcon className="stroke-gray-500" />
      </Link>
    </header>
  );
};
