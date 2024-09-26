import React, { useRef } from "react";
import Banner from "../components/banner/Banner";
import Footer from "../components/footer/Footer";

const Home = () => {
  const catRef = useRef(null);
  return (
    <>
      <Banner catRef={catRef} />
      {/*<Trending />*/}
      {/*<CategoryList catRef={catRef} />*/}
      <Footer />
    </>
  );
};

export default Home;
