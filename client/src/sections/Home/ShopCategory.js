import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import {endpoints} from "../../api";
import { Link } from "react-router-dom";

const ShopCategory = () => {
  const [carouselData, setCarouselData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints.category.getAllCategories);
        setCarouselData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6, 
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
    <Box style={{ padding: "80px 0px" }}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          my={3}
          sx={{
            fontWeight: "bold",
            fontSize: "28px",
            color: "#30363C",
            textAlign: "start",
          }}
        >
          Shop by Categories
        </Typography>

        <div className="slider-container">
          <Slider {...settings}>
            {carouselData?.data?.slice(0,6).map((item,index) => (
              <div key={index} className="slide-item">
                <div className="card">
                  <Link to={`category/${item._id}`} style={{textDecoration:"none", color:"inherit"}}>
                  <div className="img-container">
                    <img src={`${carouselData?.path}${item.categoryImage}`} alt="" />
                  </div>
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      maxWidth: "100%",
                      fontSize: "22px",
                    }}
                  >
                    {item.categoryName}
                  </Typography>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </Container>
    </Box>
  );
};

export default ShopCategory;
