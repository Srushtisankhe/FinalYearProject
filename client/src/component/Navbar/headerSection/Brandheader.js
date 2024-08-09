import React, { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import Slider from "react-slick";

const Brandheader = ({ isScrolled }) => {
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    // Simulating API call with setTimeout
    const fetchData = () => {
      setTimeout(() => {
        // Mocked offers data
        const mockOffers = [
          { id: 1, text: "30% discount all products spatial for December" },
          { id: 2, text: "Get up to Rs. 35 Freecharge UPI Cashback!.. " },
          { id: 3, text: "Get assured Savings of up to Rs. 500* + Earn up to 8X rewards*.. " },
        ];
        setOffers(mockOffers);
      }, 1000); // Simulating a 1-second delay
    };

    fetchData();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <Box
      sx={{
        bgcolor: "#ff9800",
        bgcolor: "#10847E",
        // color: "#000",
        color:"#fff",
        textAlign: "center",
        position: isScrolled ? "static" : "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "30px",
        zIndex: "999",
        padding:"2px"
      }}
    >
      <Container maxWidth="xl">
        <Slider {...settings}>
          {offers.map((offer) => (
            <div key={offer.id}>
              <Typography
                color="inherit"
                style={{
                  cursor: "pointer",
                  fontFamily: "sans-serif",
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {offer.text}
              </Typography>
            </div>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Brandheader;
