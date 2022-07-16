import React from "react";
import Banner from "../../components/Banner/Banner";
import Benefit from "../../components/Benefit/Benefit";
import Reviews from "../../components/Reviews/Reviews";
import Tours from "../../components/Tours/Tours";

const Home = () => {
  //Home Page
  return (
    <>
      <Banner />
      <Benefit />
      <Tours />
      <Reviews />
    </>
  );
};

export default Home;
