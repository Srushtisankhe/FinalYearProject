import React, { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { endpoints, productpath } from "../api";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [cookies] = useCookies(["token"]);
  const [userAuthenticated, setUserAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  const [expanded, setExpanded] = useState(null);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
  }, [cookies]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userAuthenticated) {
          const response = await axios.get(`${endpoints.order.all}/${userId}`);
          setOrders(response.data);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [userId, userAuthenticated]);

  // console.log(orders);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box style={{ marginTop: "150px" }}>
      <Container maxWidth="xl">
        <Stack textAlign="start" sx={{ py: 2 }}>
          <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography color="text.primary">Order</Typography>
          </Breadcrumbs>
          <Typography variant="h4" my={1} textAlign="start" fontWeight="bold">
            Previous Orders
          </Typography>
        </Stack>
        {orders.length === 0 ? (
          <Typography variant="subtitle1">No orders found.</Typography>
        ) : (
          orders.map((order, index) => (
            <Box key={order._id}>
              <Accordion
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
              >
                <AccordionSummary
                  aria-controls={`panel${index}d-content`}
                  id={`panel${index}d-header`}
                  style={{ display: "flex", alignItem: "center" }}
                >
                  <Typography>Order {index + 1}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container>
                    <Grid item xs={8}>
                      {order?.products.map((elem, index) => {
                        return (
                          <Box
                            style={{
                              display: "flex",
                              alignItem: "center",
                              textAlign: "start",
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
                                src={`${productpath}${elem?.variations[0].productImage[0]}`}
                                alt={elem.productName}
                              />
                            </Stack>
                            <Stack>
                              <Typography variant="h6" ml={1}>
                                {elem.productName}
                              </Typography>
                              <Typography variant="p" ml={1}>
                                {elem.manufacturerName}
                              </Typography>
                              <Typography variant="p" ml={1}>
                                MRP ₹{elem?.variations[0].price}
                              </Typography>
                            </Stack>
                          </Box>
                        );
                      })}
                    </Grid>
                    <Grid item xs={4}>
                      <Box style={{ textAlign: "start" }}>
                        <Typography variant="h5">
                          Total Amount:- ₹{order.totalAmount}
                        </Typography>
                        <Typography variant="h6">
                          Payment:- {order.paymentType}
                        </Typography>
                        <Typography variant="h6">
                          Date:- {formatDate(order.date)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Box>
          ))
        )}
      </Container>
    </Box>
  );
};

export default OrderPage;
