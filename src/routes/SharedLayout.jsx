import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Loader from "../components/loader/Loader";
import { Outlet } from "react-router";

const SharedLayout = () => {
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    setLoadingData(true);
    const id = setTimeout(() => {
      setLoadingData(false);
    }, 2000);

    return () => {
      clearTimeout(id);
    };
  }, []);
  return (
    <div className="px-[4%] md:px-[10%] pb-2">
      <Navbar />
      <div className="pt-32 sm:pt-20 min-h-[80vh]">
        {loadingData ? <Loader /> : <Outlet />}
      </div>
    </div>
  );
};

export default SharedLayout;
