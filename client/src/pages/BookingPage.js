import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import { endpoints, productpath } from "../api";
import axios from "axios";
import OrderConfirmationModal from "./OrderConfirmationModal";
import { useDispatch } from "react-redux";
import { getCart } from "../redux/cart/Action";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    shippingAddress: "",
    prescription: null,
  });
  const [paymentStep, setPaymentStep] = useState(false);
  console.log(paymentStep)

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    shippingAddress: "",
  });

  const [creditCardDetails, setCreditCardDetails] = useState({
    creditCardNumber: "",
    cvv: "",
    expirationDate: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Function to handle opening the modal
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/")
  };

  console.log(errors)

  const handleCreditCardInputChange = (event) => {
    const { name, value } = event.target;
    setCreditCardDetails({ ...creditCardDetails, [name]: value });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handlePrescriptionUpload = (event) => {
    setFormData({ ...formData, prescription: event.target.files[0] });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
  
    // Validate each field in the formData object
    for (const field in formData) {
      if (!formData[field] && field !== "prescription") {
        newErrors[field] = "This field is required";
        valid = false;
      }
    }
  
    // Validate email format if provided
    if (formData.email && !isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }
  
    // Validate phone number format if provided
    // if (formData.phoneNumber && !isValidPhoneNumber(formData.phoneNumber)) {
    //   newErrors.phoneNumber = "Please enter a valid phone number";
    //   valid = false;
    // }
  
    setErrors(newErrors);
    console.log(valid, "valid");
    return valid;
  };
  

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // const isValidPhoneNumber = (phoneNumber) => {
  //   const phoneRegex = /^\+91[0-9]{10}$/;
  // return phoneRegex.test(phoneNumber);
  // };

  const totalDetailsString = localStorage.getItem("data");
  const totalDetails = JSON.parse(totalDetailsString);
  // console.log(totalDetails);

  const userId = totalDetails?.cartItems[0]?.userId;
  const productIds = totalDetails?.cartItems?.map(
    (item) => item.productId?._id
  );
  const totalAmount = totalDetails?.totalDisAmount;

  const handleProccesPay = () => {
    const isFormValid = validateForm();
    if (isFormValid) {
      console.log("Form is valid. Proceeding with payment...");
      setPaymentStep(true);
    } else {
      console.log("Form is not valid. Please check the form fields.");
    }
  
  };

  const handleOrderSubmit = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", userId);
      formDataToSend.append("products", productIds);
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("shippingAddress", formData.shippingAddress);
      formDataToSend.append("prescription", formData.prescription);
      formDataToSend.append("totalAmount", totalAmount);
      formDataToSend.append("paymentType", formData.paymentType);

      const response = await axios.post(
        endpoints.order.createOrder,
        formDataToSend
      );
      if(response.status === 201) {
      console.log(response);
      setOrderDetails(response.data);
      handleOpenModal(true);
      dispatch(getCart(userId));
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      // Handle error response
    }
  };
  return (
    <Box sx={{ marginTop: "160px" }}>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box
              style={{
                textAlign: "start",
                color: "#4F585E",
                margin: "20px 0px",
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                Checkout
              </Typography>
              <Stack
                spacing={2}
                sx={{
                  border: "1px solid",
                  borderColor: "#D3D3D3",
                  padding: "10px",
                  borderRadius: "6px",
                  margin: "10px 0px",
                }}
              >
                <Typography variant="h6" fontWeight="bold" my={1}>
                  1. Enter A Shipping Address
                </Typography>
              </Stack>
              <Stack spacing={2} my={2}>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
                <TextField
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
                <TextField
                  label="Phone Number"
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
                <TextField
                  label="Shipping Address"
                  multiline
                  rows={4}
                  name="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={handleInputChange}
                />

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
                    textAlign: "center",
                  }}
                >
                  <input
                    id="file-upload"
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    onChange={handlePrescriptionUpload}
                  />
                  <label htmlFor="file-upload">
                    <CloudUploadOutlinedIcon
                      sx={{
                        fontSize: "80px",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      Upload Prescription
                    </Typography>
                  </label>
                </Stack>
                <Button
                  onClick={handleProccesPay}
                  sx={{
                    bgcolor: "#10847E",
                    borderRadius: "8px",
                    padding: "10px",
                    color: "#fff",
                    fontWeight: "bold",
                    margin: "20px 0px",
                    "&:hover": {
                      color: "#10847E",
                      border: "1px solid",
                      borderColor: "#10847E",
                    },
                  }}
                >
                  Continue to payment method
                </Button>
              </Stack>
              {/* payment option */}
              <Stack>
                <Stack
                  spacing={2}
                  sx={{
                    border: "1px solid",
                    borderColor: "#D3D3D3",
                    padding: "10px",
                    borderRadius: "6px",
                    margin: "10px 0px",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" my={1}>
                    2. Pay
                  </Typography>
                </Stack>
                {paymentStep && (
                  <Box>
                    {/* Payment Type Options */}
                    <Stack>
                      <Typography variant="h6" my={1}>
                        Select Payment Type
                      </Typography>
                      <FormControl component="fieldset">
                        <RadioGroup
                          aria-label="paymentType"
                          name="paymentType"
                          value={formData.paymentType}
                          onChange={handleInputChange}
                        >
                          <FormControlLabel
                            value="cash"
                            control={<Radio />}
                            label="Cash on Delivery"
                          />
                          <FormControlLabel
                            value="creditCard"
                            control={<Radio />}
                            label="Credit Card"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Stack>
                    {/* Credit Card Form */}
                    {formData.paymentType === "creditCard" && (
                      <Stack
                        style={{
                          border: "1px solid",
                          borderColor: "#D3D3D3",
                          borderRadius: "6px",
                          margin: "10px 0px",
                          padding: "10px",
                        }}
                      >
                        <Typography variant="h6" style={{ margin: "10px 0px" }}>
                          Enter Card Details
                        </Typography>
                        <Stack spacing={2}>
                          <Box>
                            <Typography>Credit Card Number</Typography>
                            <TextField
                              fullWidth
                              name="creditCardNumber"
                              value={creditCardDetails.creditCardNumber}
                              onChange={handleCreditCardInputChange}
                              placeholder="Enter credit card number"
                            />
                          </Box>
                          <Box>
                            <Typography>CVV</Typography>
                            <TextField
                              fullWidth
                              name="cvv"
                              value={creditCardDetails.cvv}
                              onChange={handleCreditCardInputChange}
                              placeholder="Enter CVV"
                            />
                          </Box>
                          <Box>
                            <Typography>Expiration Date</Typography>
                            <TextField
                              fullWidth
                              name="expirationDate"
                              value={creditCardDetails.expirationDate}
                              onChange={handleCreditCardInputChange}
                              placeholder="MM/YYYY"
                            />
                          </Box>
                        </Stack>
                      </Stack>
                    )}

                    <Stack>
                      <Button
                        onClick={handleOrderSubmit}
                        sx={{
                          bgcolor: "#10847E",
                          borderRadius: "8px",
                          padding: "10px",
                          color: "#fff",
                          fontWeight: "bold",
                          margin: "20px 0px",
                          "&:hover": {
                            color: "#10847E",
                            border: "1px solid",
                            borderColor: "#10847E",
                          },
                        }}
                      >
                        Proceed
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box style={{ marginTop: "40px" }}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{
                  border: "1px solid",
                  borderColor: "#D3D3D3",
                  padding: "10px",
                  borderRadius: "6px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    color: "#4F585E",
                    textAlign: "start",
                  }}
                >
                  Order Details {`(${totalDetails?.cartItems?.length})`}
                </Typography>
              </Stack>
              {totalDetails?.cartItems.map((elem, index) => (
                <Card
                  sx={{
                    display: "flex",
                    border: "0.5px solid",
                    borderColor: "#D3D3D3",
                    boxShadow: "none",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "10px 0px",
                    overflow: "hidden",
                  }}
                  key={index}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: "100px", height: "100px", overflow: "hidden" }}
                    image={`${productpath}${elem?.productId?.variations[0].productImage[0]}`}
                    alt="Live from space album cover"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "start",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{
                          //   fontWeight: "bold",
                          color: "#4F585E",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          width: "200px",
                        }}
                      >
                        {elem.productId?.productName}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                      >
                        ₹{elem?.price}.00{"   "}
                        {`(${elem?.quantity})`}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              ))}
            </Box>
            <Box
              sx={{
                textAlign: "start",
                marginTop: "20px",
                border: "0.5px solid",
                borderColor: "#D3D3D3",
                borderRadius: "10px",
                padding: "15px",
                color: "#4F585E",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Bill Summary
              </Typography>
              <Stack direction="row" my={1}>
                <Typography>Total MRP</Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography>
                  {" "}
                  {totalDetails ? totalDetails.totalMrpAmount : ""}
                </Typography>
              </Stack>
              <Stack direction="row" my={1}>
                <Typography>Delivery charges</Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography>0.00</Typography>
              </Stack>
              <Divider />
              <Stack direction="row" my={1} mt={2}>
                <Typography color="inherit" fontWeight="bold">
                  Amount to be paid
                </Typography>
                <Box sx={{ flexGrow: "1" }} />
                <Typography color="inherit" fontWeight="bold">
                  ₹{totalDetails ? totalDetails.totalDisAmount : ""}
                </Typography>
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <OrderConfirmationModal
        open={openModal}
        handleClose={handleCloseModal}
        orderDetails={orderDetails}
      />
    </Box>
  );
};

export default BookingPage;
