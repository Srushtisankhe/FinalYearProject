import React from "react";
import { Box, Skeleton } from "@mui/material";

const ProductCardSkeleton = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" width={"100%"} height={300} animation="wave" />
      <Box py={2}>
        <Skeleton variant="text" width={200} animation="wave" />
        <Skeleton variant="text" width={150} animation="wave" />
      </Box>
    </Box>
  );
};

export default ProductCardSkeleton;
