import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";

const OfferSection = () => {
  const carouselData = [
    {
      id: 1,
      title: "Top products",
      subtitle: "Arijit Singh",
      imageUrl:
        "https://cdn01.pharmeasy.in/dam/banner/banner/3820fdf2bc7-25OFFER.jpg",
    },
    {
      id: 2,
      title: "Elderly care",
      subtitle: "Arijit Singh",
      imageUrl:
        "https://cdn01.pharmeasy.in/dam/banner/banner/6e24170cce4-jmyj.jpg",
    },
    {
      id: 3,
      title: "Personal care",
      subtitle: "Bhupinder Babbal",
      imageUrl:
        "https://cdn01.pharmeasy.in/dam/banner/banner/a51403ec96e-Equals-two.jpg",
    },
    {
      id: 4,
      title: "Healthcare devices",
      subtitle: "Shamur",
      imageUrl:
        "https://cdn01.pharmeasy.in/dam/banner/banner/21cd10e2603-HP_2.jpg",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 2.3, // Adjust the number of slides to show
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2, 
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 960, 
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1, 
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  return (
    <Box style={{ padding: "20px 0px" }}>
      <Container maxWidth="xl">
        <div className="offer">
          <Slider {...settings}>
            {carouselData.map((item) => (
              <div key={item.id} className="slide-item">
                <div className="card">
                  <div className="img-container">
                    <img src={item.imageUrl} alt="" />
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </Box>
  );
};

export default OfferSection;
