import React from "react";
import ErrorPage from "../pages/ErrorPage";
import { Navigate, Outlet, Route, Routes, useLocation } from "react-router";
import SharedLayout from "./SharedLayout";
import Home from "../pages/Home";
import { authRoutes, contentRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";
import { useSelector, } from "react-redux";

const RequiresAuth = ({ children }) => {
  const {userData} = useSelector((state) => state.user);
  return userData ? children : <Navigate to="/login" />;
};

export const Index = () => {
  const location = useLocation();
  return (
    <Routes>
      <Route
       element={
        //   RequiresAuth ? (
        //   <Navigate
        //     to={location?.state?.from?.pathname ?? "/"}
        //     replace={true}
        //   />
        //  ) :
         <Outlet />
       }
      >
        {authRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} exact />
        ))}
      </Route>
      <Route element={<SharedLayout />}>
        <Route path="/" element={<Home />} index />
        <Route path="*" element={<ErrorPage />} />
        {contentRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}

         <Route element={<RequiresAuth />}>
        {privateRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
        </Route>
      </Route>
    </Routes>
  );
};
