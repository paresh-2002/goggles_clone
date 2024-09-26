import React from "react";
import ErrorPage from "../pages/ErrorPage";
import { Outlet, Route, Routes } from "react-router";
import SharedLayout from "./SharedLayout";
import Home from "../pages/Home";
import { authRoutes } from "./publicRoutes";

export const Index = () => {
  return (
    <Routes>
      <Route
        element={
          //</Routes>token ? (
          //  <Navigate
          //    to={location?.state?.from?.pathname ?? "/"}
          //    replace={true}
          //  />
          //) :
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
      </Route>
      ;
    </Routes>
  );
};
