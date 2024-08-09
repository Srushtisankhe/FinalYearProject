import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Button,
  IconButton,
  Skeleton,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import Tesseract from "tesseract.js";
import ReactLoading from "react-loading";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { endpoints, productpath } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { removeCart, updateCart } from "../redux/cart/Action";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";

const PrescUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [medicineNames, setMedicineNames] = useState([]);
  const [availableMedi, setAvailableMedi] = useState([]);
  const dispatch = useDispatch();
  const CartData = useSelector((state) => state.cart);
  const [cookies] = useCookies(["token"]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const sendMedicineNamesToServer = async (medicineNames) => {
    try {
      const response = await axios.post(endpoints.product.scanmedic, {
        medicineNames,
      });
      console.log(response)
      setAvailableMedi(response.data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleFileSelectionChange = async (event) => {
    setLoading(true);
    const file = event.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);

      try {
        const result = await Tesseract.recognize(imageURL, "eng");
        const extractedMedicineNames = extractMedicineNames(result.data.text);
        setMedicineNames(extractedMedicineNames);
        sendMedicineNamesToServer(extractedMedicineNames); // Send medicine names to server
      } catch (error) {
        console.error("Error recognizing text:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClearImageClick = () => {
    setSelectedImage(null);
    setMedicineNames([]);
  };

  const extractMedicineNames = (text) => {
    const medicineRegex = /\b(?:TAB|POW|CAP|SPR|CRM)\.\s*[A-Z\s]+\b/g;
    const matches = text.match(medicineRegex);
    const medicineNames = matches ? matches.map((match) => match.trim()) : [];
    return medicineNames;
  };

  const type = "cylon";
  const color = "#10847E";

  const handleAddToCart = async (id,price,discount) => {
    console.log(id,price,discount)
    const finalPrice = parseInt(price - (price* discount)/100)
    if (userAuthenticated && userId) {
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

  const handletocheckout = ()=>{
    if(availableMedi){
      navigate("/checkout")
    }
  }

// console.log(availableMedi)
  return (
    <Box style={{ marginTop: "153px" }}>
      <Container maxWidth="lg">
        <Grid spacing={2} container sx={{ margin: "20px 0px" }}>
          <Grid item sm={8} xs={12}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{
                border: "1px solid",
                borderColor: "#D3D3D3",
                padding: "10px",
                borderRadius: "6px",
                margin: "10px",
              }}
            >
              <ReceiptLongOutlinedIcon
                sx={{ fontSize: "34px", color: "#10847E" }}
              />
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#4F585E" }}
              >
                Please upload images of your prescription.
              </Typography>
            </Stack>

            <Stack
              alignItems="center"
              sx={{
                border: "1px solid",
                borderColor: "#D3D3D3",
                padding: "40px 20px",
                borderRadius: "6px",
                margin: "10px",
                color: "#10847E",
              }}
            >
              <input
                id="file-upload"
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                onChange={handleFileSelectionChange}
              />
              <label htmlFor="file-upload">
                <CloudUploadOutlinedIcon
                  sx={{ fontSize: "80px", color: "inherit", cursor: "pointer" }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Upload Prescription
                </Typography>
              </label>
            </Stack>

            {selectedImage && (
              <Stack
                className="selected-image-container"
                style={{ margin: "10px", alignItems: "start" }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#4F585E" }}
                >
                  Prescriptions uploaded by you
                </Typography>
                <Box
                  style={{
                    position: "relative",
                    width: "max-content",
                    borderRadius: "8px",
                    height: "140px",
                    width: "140px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={selectedImage}
                    width={"100%"}
                    height={"100%"}
                    alt="Selected"
                  />
                  <IconButton
                    onClick={handleClearImageClick}
                    style={{
                      position: "absolute",
                      left: "0px",
                      borderRadius: "0%",
                      bottom: "0px",
                      right: "0px",
                      backgroundColor: "rgb(232 246 246 / 90%)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "18px",
                        fontWeight: "bold",
                        color: "#4F585E",
                      }}
                    >
                      Remove
                    </span>{" "}
                    <ClearOutlinedIcon />
                  </IconButton>
                </Box>

                {loading && (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      borderRadius: "8px",
                    }}
                  >
                    <ReactLoading
                      type={type}
                      color={color}
                      height={"8%"}
                      width={"8%"}
                    />
                  </Box>
                )}

                {!loading && (
                  <Grid
                    container
                    style={{ textAlign: "start", margin: "10px 0px" }}
                  >
                    {availableMedi.map((item, index) => (
                      <Grid item xs={12} key={index} sx={{ padding: "8px" }}>
                        
                        <Box
                          style={{
                            display: "flex",
                            padding: "10px",
                            borderRadius: "8px",
                            border: "1px solid",
                            borderColor: "#D3D3D3",
                            width: "100%",
                          }}
                        >
                          <Stack
                            style={{
                              width: "120px",
                              height: "120px",
                              padding: "10px",
                              borderRadius: "8px",
                              border: "1px solid",
                              borderColor: "#D3D3D3",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                              src={`${productpath}${item?.variations[0]?.productImage[0]}`}
                              alt={item?.productName}
                            />
                          </Stack>
                          <Stack
                            style={{
                              padding: "0px 20px",
                              width: "100%",
                              textAlign: "start",
                            }}
                          >
                            <Typography
                              variant="h6"
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
                                to={`/productDetails/${item._id}?item=${item.variations[0].item}`}
                                underline="hover"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                }}
                              >
                                {item.productName}
                              </Link>
                            </Typography>

                            <Typography variant="subtitle1">
                              {item?.manufacturerName}
                            </Typography>

                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="end"
                            >
                              <Stack style={{ textAlign: "start" }}>
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
                                    {item.variations[0]?.price}
                                  </span>
                                </Typography>
                                <Typography
                                  variant="p"
                                  sx={{
                                    fontWeight: "bold",
                                    color: "#4F585E",
                                  }}
                                >
                                  {parseInt(item.variations[0]?.price - (item.variations[0]?.price * item.discount)/100)}
                                </Typography>
                              </Stack>
                              <Stack>
                                <IconButton onClick={()=>handleAddToCart(item._id,item.variations[0]?.price,item.discount)}>
                                  <ShoppingCartOutlinedIcon
                                    style={{
                                      fontSize: "28px",
                                      color: "#10847E",
                                    }}
                                  />
                                </IconButton>
                              </Stack>
                            </Box>
                          </Stack>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Stack>
            )}

            <Typography sx={{ textAlign: "start", margin: "10px" }}>
              A licensed pharmacy would be delivering your order basis
              availability of product & fastest delivery.
            </Typography>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Stack sx={{ margin: "10px" }}>
              <Button
                onClick={handletocheckout}
                style={{
                  backgroundColor: "#959595",
                  color: "#fff",
                  fontSize: "18px",
                  fontWeight: "bold",
                  padding: "12px",
                  border: "none",
                  borderRadius: "6px",
                }}
              >
                Proceed To Checkout
              </Button>
              <Typography
                variant="subtitle2"
                style={{ textAlign: "start", color: "#4F585E" }}
              >
                What is a valid prescription?
              </Typography>
            </Stack>
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
  );
};

export default PrescUpload;
