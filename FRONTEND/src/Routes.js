import Home from "./pages/Home";
import Isletmeler from "./pages/Isletmeler";
import Odemeler from "./pages/Home";
import Projeler from "./pages/Isletmeler";
import NavBar from "./layouts/NavBar";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/isletmeler",
    component: Isletmeler,
  },
  {
    path: "/projeler",
    component: Projeler,
  },
  {
    path: "/odemeler",
    component: Odemeler,
  },
];

export const Rotalar = () => {
  return (
    <BrowserRouter>
      <Routes>
        {
          <Route
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          >
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Route>
        }
      </Routes>
    </BrowserRouter>
  );
};
