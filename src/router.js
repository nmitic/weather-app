import { createBrowserRouter } from "react-router-dom";
import Locations from "./routes/Locations/Locations";
import Root from "./routes/Root/Root";
import LocationDetail from "./routes/LocationDetail/LocationDetail";
import { LocationDetailLoader } from "./routes/LocationDetail/LocationDetail";
import { rootLoader } from "./routes/Root/Root";
import { ErrorView } from "./components/ErrorView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorView />,
    loader: rootLoader,
  },
  {
    path: "/locations",
    element: <Locations />,
    errorElement: <ErrorView />,
  },
  {
    path: "/locations/:locationName",
    element: <LocationDetail />,
    errorElement: <ErrorView />,
    loader: LocationDetailLoader,
  },
]);
