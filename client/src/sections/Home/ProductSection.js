import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useMemo, useState } from "react";
import {endpoints} from "../../api";
import ProductCard from "../products/ProductCard";


const ProductSection = () => {
  const [products, setProducts] = useState([]);

  useMemo(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints.product.all);
        // console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ padding: "50px 0px" }}>
      <Container maxWidth="xl">
        <Stack>
          <Typography
            variant="h5"
            my={3}
            sx={{
              fontWeight: "bold",
              fontSize: "30px",
              color: "#30363C",
              textAlign: "start",
            }}
          >
            Our Latest Products
          </Typography>
        </Stack>
        <Divider />
        <Grid container spacing={1} sx={{ marginTop: "20px" }}>
          <Grid item xs={12} md={3} style={{ padding: "20px" }}>
            <Box
              sx={{
                height: "100%",
                width: "100%",
                borderRadius: "2px",
                overflow: "hidden",
                backgroundColor: "#DFF8FF",
                position: "relative",
              }}
            >
              <Box
                style={{
                  position: "absolute",
                  top: "5%",
                  left: "45%",
                  transform: "translate(-50%,-0%)",
                  zIndex: "2 !important",
                  // opacity: "0.8",
                  textAlign: "start",
                }}
              >
                <Stack
                  sx={{
                    bgcolor: "#F3A952",
                    borderRadius: "20px",
                    padding: "6px",
                    width: "130px",
                    color: "#10847E",
                    margin: "10px 0px",
                    fontSize: "12px",
                    textAlign: "center",
                    color: "#fff",
                  }}
                >
                  New Product
                </Stack>
                <Typography variant="h6" style={{fontWeight:"bold"}} color="#30363C">
                  {" "}
                  Amandean Wild Caught
                </Typography>
                <Button
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: "30px",
                    padding: "8px",
                    width: "120px",
                    color: "#10847E",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    "&:hover": {
                      color: "#fff",
                      border: "1px solid",
                      borderColor: "#fff",
                      backgroundColor:"#10847E"
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
              {/* <img
                src={
                  "https://images.ctfassets.net/hrltx12pl8hq/a2hkMAaruSQ8haQZ4rBL9/8ff4a6f289b9ca3f4e6474f29793a74a/nature-image-for-website.jpg?fit=fill&w=600&h=400"
                }
                alt="Hero"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              /> */}
              <img src="https://medimela-react.envalabdemos.com/static/media/banner-bg.595b20f89d640e8555b9.png"></img>
              <img
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translate(-50%,-20%)",
                }}
                src="https://medimela-react.envalabdemos.com/static/media/left-img.c45996de13a78161887a.png"
              ></img>
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Box style={{ height: "100%" }}>
              <Grid container style={{ height: "100%" }}>
                {products?.data?.slice(0,6).map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                      padding: "12px",
                    }}
                  >
                    <ProductCard product={item} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductSection;
