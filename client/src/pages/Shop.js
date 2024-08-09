import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { allProduct } from "../redux/product/Action";
import ProductList from "../sections/products/ProductList";
import ProductFilterSidebar from "../sections/products/ProductFilterSidebar";
import ProductSort from "../sections/products/ProductSort";

const Shop = () => {
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = Object.fromEntries(new URLSearchParams(location.search));
  const fetchData = useSelector((state) => state.proStore);
  // console.log(fetchData)

  const prevQueryParams = useRef({});
  
  useEffect(() => {
    dispatch(allProduct({}));
  }, [dispatch]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };
  
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ marginTop: "150px" }}></Box>
        <Stack textAlign="start" sx={{ py: 2}}>
          <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography color="text.primary">Medicine</Typography>
          </Breadcrumbs>

          <Typography variant="h4" sx={{ my: 1, fontWeight: "bold" }}>
           Medicine
          </Typography>
        </Stack>

        <Divider />
        {/* <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2 }}
        >
          <ProductFilterSidebar
            openFilter={openFilter}
            onOpenFilter={handleOpenFilter}
            onCloseFilter={handleCloseFilter}
            fetchData={fetchData}
            queryParams={queryParams}
          />
          <ProductSort />
        </Stack> */}
        <Divider />
        <ProductList fetchData={fetchData} />
      </Container>
    </>
  );
};

export default Shop;




