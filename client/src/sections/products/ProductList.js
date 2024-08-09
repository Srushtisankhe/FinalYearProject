import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { Grid, Stack, Typography, Button, useMediaQuery } from "@mui/material";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ViewCompactRoundedIcon from "@mui/icons-material/ViewCompactRounded";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductList = ({ fetchData }) => {
  const [productData, setProductData] = useState([]);
  const [columns, setColumns] = useState(3);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (fetchData && fetchData.products) {
      setProductData(fetchData.products);
      setIsLoading(false);
    }
  }, [fetchData]);

  useEffect(() => {
    if (isMobile) {
      setColumns(6);
    } else {
      setColumns(3);
    }
  }, [isMobile]);

  const handleColumnChange = (numColumns) => {
    setColumns(numColumns);
  };

  const renderButton = (numColumns, icon, text) => {
    return (
      <Button
        variant="outlined"
        onClick={() => handleColumnChange(numColumns)}
        sx={{
          border: columns === numColumns ? "2px solid #000" : "none",
          width: "40px",
          height:"40px",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          margin: "0 4px",
          "&:hover": {
            border:"2px solid #000"
          }
        }}
      >
        {icon}
        {text && <Typography sx={{ color: "#000", ml: 1 }}>{text}</Typography>}
      </Button>
    );
  };

  return (
    <>
      <Stack
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        sx={{ py: 2 }}
      >
        <Typography sx={{ fontWeight: "bold" }}>
          {productData.length} PRODUCTS
        </Typography>
        <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
          {isMobile && renderButton(12, <CheckBoxOutlineBlankIcon sx={{color:"#000"}}/>, null)}

          {renderButton(6, <GridViewOutlinedIcon sx={{color:"#000"}}/>, null)}

          {!isMobile && renderButton(3, <ViewCompactRoundedIcon sx={{color:"#000"}}/>, null)}
        </Stack>
      </Stack>

      <Grid container my={5} px={2} spacing={2}>
        {productData.map((product, index) => (
          <Grid key={index} item xs={columns} p={1}>
            <ProductCard product={product} isLoading={isLoading} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ProductList;
