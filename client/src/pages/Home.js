import React from "react";
import { styled } from "@mui/material";
import Herosection from "../sections/Home/Herosection";
import ShopCategory from "../sections/Home/ShopCategory";
import OfferSection from "../sections/Home/OfferSection";
import ProductSection from "../sections/Home/ProductSection";
import BannerSection from "../sections/Home/BannerSection";
import LoyaltyFeatures from "../sections/Home/LoyaltyFeatures";

const Home = () => {
  const ScreenDiv = styled("div")(({ theme, value }) => ({
    position: "relative",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
  }));

  const ScreenText = styled("h1")(({ theme, value }) => ({
    color: "white",
    fontSize: "6rem",
    fontWeight: "lighter",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    [theme.breakpoints.down("sm")]: {
      fontSize: "4rem",
    },
    // width:"90%",
    // margin:"0px auto"
  }));
  return (
    <div style={{ marginTop: "153px",}}>
      <Herosection/>
      <ShopCategory/>
      <OfferSection/>
      <ProductSection/>
      <BannerSection/>
      <LoyaltyFeatures/>
    </div>
  );
};

export default Home;
