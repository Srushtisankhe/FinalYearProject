import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import ProductSort from "../products/ProductSort";
import ProductFilterSidebar from "../products/ProductFilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../../redux/product/Action";
import ProductCard from "../products/ProductCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import {endpoints} from "../../api";

const Banner = styled("div")({
  backgroundImage:
    "url(https://cdn.sanity.io/images/qa41whrn/prod/7881608ab589c6e1396f773971047a3b423acb75-1440x85.jpg?w=2160&q=80&auto=format)",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  padding: "18px 0px",
  color: "white",
  marginTop: "75px",
});

const MaxWidth = styled("div")({
  maxWidth: "1600px",
  margin: "0px auto",
  padding: "0px 10px",
});

const CategoryRelat = () => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const [cateRelateData, setCateRelateData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(endpoints.product.byCategory+id)
      .then((res) => {
        setCateRelateData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  console.log(cateRelateData)

  return (
    <>
      <Box style={{marginTop:"150px"}}>
        <Container maxWidth="xl">
        <Stack textAlign="start" sx={{ py: 2, px: 4 }}>
          <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>
            <Typography color="text.primary">Category</Typography>
          </Breadcrumbs>

          <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
            PRODUCTS
          </Typography>
        </Stack>

        <Divider />

        <Box px={4} py={4}>
          <Grid container>
            {cateRelateData
              ?.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} md={3} p={1}>
                  <ProductCard product={product} />
                </Grid>
              ))}
          </Grid>
        </Box>
        </Container>
      </Box>
    </>
  );
};

export default CategoryRelat;
