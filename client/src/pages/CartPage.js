import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getCart, removeCart, updateCart } from "../redux/cart/Action";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "../sections/cart/CartCard";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";

const CartPage = () => {
  const [userId, setUserId] = useState("");
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const CartData = useSelector((state) => state.cart);
  const cookies = new Cookies();

  const totalDetailsString = localStorage.getItem("data");
  const totalDetails = JSON.parse(totalDetailsString);
  // console.log(totalDetails);

  const navigate = useNavigate()

  useEffect(() => {
    const userCookie = cookies.get("token");
    if (userCookie) {
      const decoded = jwtDecode(userCookie);
      setUserAuthenticated(true);
      setUserId(decoded.id);
    } else {
      setUserAuthenticated(false);
      setUserId("");
    }
  }, [cookies]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (userAuthenticated) {
          await dispatch(getCart(userId));
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();

  }, [userId, userAuthenticated, dispatch]);
  

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await dispatch(updateCart(cartItemId, quantity));
      dispatch(getCart(userId));
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await dispatch(removeCart(cartItemId));
      dispatch(getCart(userId))
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // console.log(CartData)

  const handleCheckoutClicked = ()=>{
    if(totalDetails.cartItems.length > 0){
      navigate("/checkout")
    }

  }
  return (
    <Box style={{ marginTop: "160px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={2} mb={5}>
          <Grid item xs={12} md={8}>
            <Box>
              <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
                <Link underline="hover" color="inherit" href="/">
                  Home
                </Link>
                <Link underline="hover" color="inherit" href="/">
                  Cart
                </Link>
              </Breadcrumbs>

              <Stack
                style={{
                  border: "0.5px solid",
                  borderColor: "#D3D3D3",
                  borderRadius: "10px",
                }}
              >
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{
                    textAlign: "start",
                    padding: "15px",
                    color: "#4F585E",
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: "bold" }}>
                    {CartData?.cartItems?.length} Item in your Cart
                  </Typography>
                  <Typography
                    color="#10847E"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <FavoriteBorderOutlinedIcon sx={{ marginRight: "5px" }} />
                    Saved For Later
                  </Typography>
                </Box>

                <Divider />
                {CartData.cartItems.length > 0 ? (
                  <Grid
                    container
                    style={{ textAlign: "start", margin: "10px 0px" }}
                  >
                    {CartData?.cartItems.map((item, index) => (
                      <Grid item xs={12} key={index} sx={{ padding: "8px" }}>
                        <CartCard
                          singleCartData={item}
                          handleRemoveItem={handleRemoveItem}
                          handleQuantityChange={handleQuantityChange}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Box style={{ minHeight: "300px" , display:"flex", justifyContent:"center", alignItems:"center"}}>
                    <Stack direction="column">
                      <img width="100px" height="100px" style={{margin:"10px auto"}} src="https://assets.pharmeasy.in/web-assets/images/emptyCart.png?dim=96x96&q=75"></img>
                      <Typography variant="subtitle2" color="#888888" fontWeight="bold">
                        Your Medicine/Healthcare cart is empty!
                      </Typography>
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              style={{
                textAlign: "start",
                marginTop: "55px",
                border: "0.5px solid",
                borderColor: "#D3D3D3",
                borderRadius: "10px",
                padding: "15px",
                color: "#4F585E",
              }}
            >
              <Typography variant="h5" my={1} color="inherit" fontWeight="bold">
                Cart total:{totalDetails?.totalDisAmount}
              </Typography>
              <Divider />
              <Button
                sx={{
                  bgcolor: "#10847E",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "100%",
                  color: "#fff",
                  fontWeight: "bold",
                  margin: "20px 0px",
                  "&:hover": {
                    color: "#10847E",
                    border: "1px solid",
                    borderColor: "#10847E",
                  },
                }}
                onClick={handleCheckoutClicked}
              >
                Add Delivery Address
              </Button>
              <Stack
                direction="row"
                sx={{
                  borderRadius: "8px",
                  padding: "10px",
                  width: "100%",
                  color: "inherit",
                  fontWeight: "bold",
                  margin: "0px 0px 10px",
                  border: "1px solid",
                  borderColor: "#D3D3D3",
                }}
              >
                <Typography>Apply Coupon</Typography>
                <Box sx={{ flexGrow: "1" }} />
                <KeyboardArrowRightIcon />
              </Stack>
            </Box>

            <Box
              style={{
                textAlign: "start",
                marginTop: "20px",
                border: "0.5px solid",
                borderColor: "#D3D3D3",
                borderRadius: "10px",
                padding: "15px",
                color: "#4F585E",
              }}
            >
              <Typography
                variant="h6"
                my={1}
                mb={2}
                color="inherit"
                fontWeight="bold"
              >
                Bill Summary
              </Typography>
              <Stack direction="row" my={1}>
                <Typography>Total MRP</Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography>{totalDetails?.totalMrpAmount}</Typography>
              </Stack>
              <Stack direction="row" my={1}>
                <Typography>Delivery charges</Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography>0.00</Typography>
              </Stack>
              <Stack
                sx={{
                  borderRadius: "8px",
                  padding: "15px",
                  width: "100%",
                  color: "#fff",
                  margin: "10px 0px",
                  border: "1px solid",
                  borderColor: "#D3D3D3",
                  backgroundColor: "#3E415B",
                  fontSize: "12px",
                }}
              >
                Login to check if you have Free Delivery
              </Stack>
              <Stack direction="row" my={1} mt={2}>
                <Typography color="inherit" fontWeight="bold">
                  Amount to be paid
                </Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography color="inherit" fontWeight="bold">
                 ₹{totalDetails?.totalDisAmount}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CartPage;
