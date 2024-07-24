import Home from "./pages/Home";
import Isletmeler from "./pages/Isletmeler";
import Odemeler from "./pages/Odemeler";
import Projeler from "./pages/Projeler";
import NavBar from "./layouts/NavBar";
import Parametreler from "./pages/Parametreler";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

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
  {
    path: "/parametreler",
    component: Parametreler,
  },
];

export const Rotalar = () => {
  const user = localStorage.getItem("token");
  //const user = "hep var";
  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/register" element={<UserRegister />} />
          </>
        ) : (
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
        )}
      </Routes>
    </BrowserRouter>
  );
};
