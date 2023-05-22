import { createBrowserRouter } from "react-router-dom";
import Locations from "./routes/Locations/Locations";
import Root from "./routes/Root/Root";
import LocationDetail from "./routes/LocationDetail/LocationDetail";
import { LocationDetailLoader } from "./routes/LocationDetail/LocationDetail";
import { rootLoader } from "./routes/Root/Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <div>error</div>,
    // loader: rootLoader,
  },
  {
    path: "/locations",
    element: <Locations />,
    errorElement: <div>error</div>,
  },
  {
    path: "/locations/:locationName",
    element: <LocationDetail />,
    errorElement: <div>error</div>,
    loader: LocationDetailLoader,
  },
]);
