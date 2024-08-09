import {
  Box,
  Breadcrumbs,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  ThemeProvider,
  createTheme,
  Divider,
  Button,
  Select,
  MenuItem,
  Skeleton,
  Container,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import Banner from "../../layouts/Banner/Banner";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { allProduct } from "../../redux/product/Action";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { endpoints, productpath } from "../../api";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { getCart, updateCart } from "../../redux/cart/Action";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const item = queryParams.get("item");

  const [productData, setProductData] = useState({
    productName: "",
    productSku: "",
    proDesc: "",
    shortDesc: "",
    proQuantity: "",
    price: "",
    category: "",
    subCategory: "",
    visible: false,
    proStatus: "",
    productImage: [],
    proTag: [],
    discount: "",
    manufacturerName: "",
    manufacturerBrand: "",
  });

  const [loading, setLoading] = useState(true);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  const [inCart, setInCart] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [cookies] = useCookies(["token"]);
  const navigate = useNavigate()

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

  useMemo(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/products/${id}?item=${item}`
        );
        // console.log(res);
        setProductData(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [id, item]);


  const dispatch = useDispatch();
  const products = useSelector((state) => state?.proStore);
  const CartData = useSelector((state) => state.cart);
  console.log(CartData)

  const [recomData, setRecomData] = useState([]);
  useEffect(() => {
    dispatch(allProduct(),getCart(userId));
  }, [dispatch]);

  const buttonstatus  = sessionStorage.getItem("buttonStatus")
  // console.log(products);

  const theme = createTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const orignalPrice = productData.price;

  const finalPrice = parseInt(
    productData.price - (productData.price * productData.discount) / 100
  );

  // useEffect(() => {
  //   const isInCart = CartData?.cartItems?.filter((item) => item.productId._id === id);
  //   if(isInCart && isInCart[0]){
  //     setInCart(isInCart[0]._id);
  //     setQuantity(isInCart[0].quantity);
  //   }else{
  //     setInCart(null)
  //   }
  // },[id]);

  useEffect(() => {
    const isInCart = CartData?.cartItems?.find((item) => item.productId._id === id);
    if(isInCart){
      setInCart(isInCart._id);
      setQuantity(isInCart.quantity);
    } else {
      setInCart(null);
    }
  }, [CartData, id]);
  

  const handleCartview = ()=>{
    navigate("/cart")
  }

  const handleAddToCart = async () => {
    if (userAuthenticated) {
      try {
        const response = await axios.post(
          endpoints.cart.addToCart,
          {
            userId: userId,
            productId: id,
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
        localStorage.setItem("cartId", JSON.stringify(response.data.data))
        setSnackbarMessage("Product added to cart");
        setSnackbarOpen(true);
        setInCart(true);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      console.log("User not authenticated");
    }
  };

  const handleQuantityChange = async (cartItemId, quantity) => {
    try {
      await dispatch(updateCart(cartItemId, quantity));
      setQuantity(quantity)
    } catch (error) {
      console.error("Error updating cart:", error);
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


  const settings = {
    customPaging: function (i) {
      return (
        <div style={{ textAlign: "center" }}>
          <a>
            <img
              src={`${productpath}${productData.productImage[i]}`}
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              alt={`Thumbnail ${i + 1}`}
            />
          </a>
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div style={{ height: "100%" }}>
        <ul
          className="smallimg"
          style={{
            position: "absolute",
            bottom: "-40px",
            right: 0,
            left: 0,
            margin: "auto",
            padding: "0px ",
          }}
        >
          {dots}
        </ul>
      </div>
    ),
  };

  return (
    <ThemeProvider theme={theme} style={{ overflow: "hidden" }}>
      <>
        <Box style={{ marginTop: "150px" }}>
          <Container maxWidth="xl">
            <Grid container my={3}>
              <Grid item xs={12} sm={9} p={2}>
                <Box>
                  <Breadcrumbs
                    separator="/"
                    aria-label="breadcrumb"
                    sx={{ my: 2 }}
                  >
                    <Link underline="hover" color="inherit" href="/">
                      Home
                    </Link>
                    <Link underline="hover" color="inherit" href="/">
                      Products
                    </Link>
                    <Typography color="text.primary">
                      {productData.productName}{" "}
                    </Typography>
                  </Breadcrumbs>

                  <Grid container mb={2}>
                    <Grid item xs={12} md={4} pb={5} mb={5}>
                      <div className="slider-content">
                        <Slider {...settings}>
                          {productData.productImage.map((elem, index) => (
                            <div key={index} className="inner-slide">
                              <img
                                src={`${productpath}${elem}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                                alt={`Images ${index + 1}`}
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>
                    </Grid>
                    {/*  Product info */}
                    <Grid
                      item
                      xs={12}
                      md={8}
                      p={2}
                      style={{ textAlign: "start" }}
                    >
                      <Stack>
                        {loading ? (
                          <Stack>
                            <Skeleton
                              variant="text"
                              width="100%"
                              height="50px"
                            />
                            <Skeleton variant="text" width="70%" />
                            <Skeleton variant="text" width="15%" />
                            <Skeleton
                              variant="text"
                              width="20%"
                              height="40px"
                            />
                            <Skeleton variant="text" width="30%" />
                            <Skeleton variant="text" width="20%" />
                            <Skeleton variant="text" width="60%" />
                          </Stack>
                        ) : (
                          <>
                            <Typography
                              mb={1}
                              sx={{
                                fontWeight: "bold",
                                fontSize: "26px",
                                lineHeight: 1.2,
                                color: "#4F585E",
                              }}
                            >
                              {productData.productName}
                            </Typography>

                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="end"
                            >
                              <Stack style={{ textAlign: "start" }}>
                                {loading ? (
                                  <>
                                    <Skeleton
                                      variant="text"
                                      width={50}
                                      animation="wave"
                                    />
                                    <Skeleton
                                      variant="text"
                                      width={50}
                                      animation="wave"
                                    />
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
                                        ₹{orignalPrice}.00
                                      </span>
                                    </Typography>
                                    <Typography
                                      variant="p"
                                      sx={{
                                        fontWeight: "bold",
                                        color: "#4F585E",
                                        fontSize: "20px",
                                      }}
                                    >
                                      ₹{finalPrice}.00{" "}
                                    </Typography>
                                    <Typography
                                      style={{
                                        fontSize: "10px",
                                        color: "inherit",
                                        textTransform: "uppercase",
                                      }}
                                      align="left"
                                    >
                                      Inclusive of all taxes
                                    </Typography>
                                  </>
                                )}
                              </Stack>
                              <Stack>
                                {buttonstatus ? (
                                  <Select
                                    value={quantity}
                                    size="small"
                                    onChange={(e) =>
                                      handleQuantityChange(
                                        inCart,
                                        e.target.value
                                      )}
                                    style={{ minWidth: "80px" }}
                                  >
                                    {[1, 2, 3, 4, 5].map((quantity) => (
                                      <MenuItem key={quantity} value={quantity}>
                                        {quantity}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                ) : (
                                  <Button
                                    sx={{
                                      bgcolor: "#10847E",
                                      borderRadius: "8px",
                                      padding: "10px",
                                      width: "150px",
                                      color: "#fff",
                                      fontWeight: "bold",
                                      margin: "10px 0px",
                                      "&:hover": {
                                        color: "#10847E",
                                        border: "1px solid",
                                        borderColor: "#10847E",
                                      },
                                    }}
                                    onClick={handleAddToCart}
                                  >
                                    Add to cart
                                  </Button>
                                )}
                              </Stack>
                            </Box>
                            <Typography
                              style={{
                                fontSize: "14px",
                              }}
                              align="left"
                              mb={2}
                            >
                              Delivery by{" "}
                              <span style={{ fontWeight: "bold" }}>
                                {" "}
                                Today, before 10:00 pm
                              </span>
                            </Typography>
                          </>
                        )}

                        <Divider sx={{ borderStyle: "solid" }} />
                        <Stack my={2}>
                          {productData.variations && (
                            <>
                              <Typography
                                variant="p"
                                style={{ color: "#4F585E", fontWeight: "bold" }}
                              >
                                Select Available Variant
                              </Typography>

                              <Typography
                                variant="p"
                                style={{
                                  color: "#4F585E",
                                  fontWeight: "bold",
                                  margin: "5px 0px",
                                }}
                              >
                                Power
                              </Typography>

                              <Grid container>
                                {productData?.variations?.map((elem, index) => (
                                  <Grid
                                    item
                                    key={index}
                                    xs={2}
                                    sx={{
                                      padding: "4px",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      sx={{
                                        bgcolor: "#fff",
                                        borderRadius: "8px",
                                        padding: "6px",
                                        width: "80px",
                                        color: "#10847E",
                                        fontWeight: "bold",
                                        border: "1px solid",
                                        borderColor: "#10847E",
                                        fontWeight: "bold",
                                        "&:hover": {
                                          color: "#fff",
                                          bgcolor: "#4F585E",
                                        },
                                      }}
                                    >
                                      <Link
                                        to={`/productDetails/${id}?item=${elem.item}`}
                                        underline="hover"
                                        style={{
                                          textDecoration: "none",
                                          color: "inherit",
                                        }}
                                      >
                                        {elem.power}
                                      </Link>
                                    </Button>
                                  </Grid>
                                ))}
                              </Grid>
                            </>
                          )}
                        </Stack>
                        <Stack>
                          <Typography
                            variant="p"
                            style={{
                              color: "#4F585E",
                              fontWeight: "bold",
                              margin: "5px 0px",
                            }}
                          >
                            Info
                          </Typography>
                          <Typography variant="p">
                            {productData.shortDesc}
                          </Typography>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Divider sx={{ borderStyle: "solid" }} />

                  <Box
                    sx={{
                      bgcolor: "#EFEFEF",
                      borderRadius: "4px",
                      textAlign: "start",
                    }}
                    my={2}
                    p={4}
                  >
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        color: "#4F585E",
                        marginBottom: "5px",
                      }}
                    >
                      Description
                    </Typography>
                    <div
                      className="proDescDiv"
                      style={{ textAlign: "left" }}
                      dangerouslySetInnerHTML={{
                        __html: productData.description,
                      }}
                    />
                  </Box>
                  <Box py={1}>
                    <Typography
                      variant="h5"
                      my={2}
                      sx={{ fontWeight: "bold", textAlign: "start" }}
                    >
                      RECOMMENDED FOR YOU
                    </Typography>

                    <Grid container>
                      {recomData
                        .filter(
                          (elem) =>
                            elem.category === productData.category &&
                            productData.productName !== elem.productName
                        )
                        .map((product, index) => (
                          <Grid key={index} item xs={12} sm={6} md={3} p={1}>
                            <ProductCard product={product} />
                          </Grid>
                        ))}
                    </Grid>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sm={3} p={2} className="checkhide">
                <Box
                  style={{
                    textAlign: "start",
                    position: "sticky",
                    top: "50%",
                    transform: "translate(0%,-50%)",
                  }}
                >
                  <Stack>
                    <Typography
                      variant="h6"
                      style={{
                        fontWeight: "bold",
                        color: "#4F585E",
                        marginBottom: "5px",
                      }}
                    >
                     {CartData.cartItems?.length > 0 ? `${CartData?.cartItems?.length} Item in your Cart` : `Please add item(s) to proceed`} 
                    </Typography>
                    <Button
                      style={{
                        backgroundColor:CartData.cartItems?.length > 0 ? "#959595" :"#10847E" ,
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        padding: "10px",
                        border: "none",
                        borderRadius: "6px",
                        // backgroundColor:"#10847E"
                      }}
                      disabled= {CartData.cartItems?.length > 0? false : true }
                      onClick={handleCartview}
                    >
                      View Cart
                    </Button>
                  </Stack>

                  <Box
                    style={{
                      marginTop: "20px",
                      border: "0.5px dashed",
                      borderColor: "red",
                      borderRadius: "6px",
                      padding: "10px",
                      color: "#4F585E",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "5px",
                        right: "5px",
                        color: "red",
                      }}
                    >
                      <LocalOfferOutlinedIcon />
                    </Box>
                    <Typography variant="p" fontWeight="bold">
                      Get Offer
                    </Typography>
                    <Stack direction="row" my={1}>
                      <Typography variant="subtitle2" fontSize="12px">
                        Get extra 10% Off on Everherb, Liveasy or PharmEasy
                        products
                      </Typography>
                      <Box sx={{ flexGrow: "1" }} />
                      <KeyboardArrowRightIcon />
                    </Stack>
                    <Stack direction="row">
                      {" "}
                      <Typography variant="subtitle2" fontSize="12px">
                        Get Upto ₹250 cashback using CRED pay UPI{" "}
                      </Typography>{" "}
                      <Box sx={{ flexGrow: "1" }} />
                      <KeyboardArrowRightIcon />
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
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
        </Box>
      </>
    </ThemeProvider>
  );
};

export default ProductDetails;
