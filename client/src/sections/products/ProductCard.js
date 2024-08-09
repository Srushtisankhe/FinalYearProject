import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Typography,
  Stack,
  Skeleton,
  Button,
  IconButton,
} from "@mui/material";
import styled from "styled-components";
import { Link } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Slider from "react-slick";
import axios from "axios";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { endpoints, productpath } from "../../api";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const ProductCard = ({ product, isLoading }) => {
  const { productName, proStatus, variations, discount, _id } = product;
  const { productImage } = variations[0];
  const originalPrice = variations[0].price;
  const finalPrice = parseInt(originalPrice - (originalPrice * discount) / 100);
  const item = variations[0].item;

  const [cookies] = useCookies(["token"]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const userCookie = cookies.token;
    if (userCookie) {
      const decoded = jwtDecode(userCookie);
      setUserAuthenticated(true);
      setUserId(decoded.id);
    } else {
      setUserAuthenticated(false);
      setUserId("");
    }
  }, [cookies,userId,userAuthenticated]);

  const handleAddToCart = async () => {
    if (userAuthenticated && userId) {
      try {
        const response = await axios.post(
          endpoints.cart.addToCart,
          {
            userId: userId,
            productId: _id,
            quantity: 1,
            price: finalPrice,
            power: "",
            units: "",
          },
          {
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        );
        // console.log(response.data);
        setSnackbarMessage("Product added to cart");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.log("User not authenticated or userId not available");
    }
  };
  

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setSnackbarOpen(false);
  };

  const vertical = "bottom"
  const horizontal = "right"

  return (
    <Card
      style={{
        boxShadow: "none",
        // border: "1px solid red",
        overflow: "hidden",
        width: "100%",
      }}
    >
      {isLoading ? (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={300}
          animation="wave"
        />
      ) : (
        <Box
          sx={{
            position: "relative",
            height: "300px",
            border: "1px solid",
            borderRadius: "12px",
            borderColor: "#D3D3D3",
            overflow: "hidden",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Slider {...settings} className="product_slider">
            {productImage?.map((image, index) => (
              <div key={index}>
                <img
                  alt={productName}
                  src={`${productpath}${image}`}
                  style={{
                    width: "100%",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Slider>
        </Box>
      )}

      <Box spacing={2} sx={{ py: 1, mb: 1 }}>
        <Stack>
          {isLoading ? (
            <Skeleton variant="text" width={200} animation="wave" />
          ) : (
            <Typography
              variant="body1"
              align="left"
              sx={{
                fontWeight: "bold",
                color: "#4F585E",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              <Link
                to={`/productDetails/${_id}?item=${item}`}
                underline="hover"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {productName}
              </Link>
            </Typography>
          )}

          <Box display="flex" justifyContent="space-between" alignItems="end">
            <Stack style={{ textAlign: "start" }}>
              {isLoading ? (
                <>
                  <Skeleton variant="text" width={50} animation="wave" />
                  <Skeleton variant="text" width={50} animation="wave" />
                </>
              ) : (
                <>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    style={{ color: "#A6A6A6" }}
                  >
                    MRP
                    <span
                      style={{
                        color: "inherit",
                        textDecoration: "line-through",
                        marginLeft: "6px",
                      }}
                    >
                      ₹{originalPrice}.00
                    </span>
                  </Typography>
                  <Typography
                    variant="p"
                    sx={{ fontWeight: "bold", color: "#4F585E" }}
                  >
                    ₹{finalPrice}.00{" "} <span style={{color:"red"}}>{`(${discount}%)`}</span>
                  </Typography>
                </>
              )}
            </Stack>
            <Stack>
              <IconButton onClick={handleAddToCart}>
                <ShoppingCartOutlinedIcon
                  style={{ fontSize: "28px", color: "#10847E" }}
                />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="success"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default ProductCard;
