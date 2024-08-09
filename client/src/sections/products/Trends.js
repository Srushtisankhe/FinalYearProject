
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { allProduct } from '../../redux/product/Action';
import { Box, Grid, Typography } from '@mui/material';
import ProductCard from './ProductCard';

const Trends = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state?.proStore?.products?.data);
  const [recomData, setRecomData] = useState([]);

  useEffect(() => {
    dispatch(allProduct());
  }, [dispatch]);

  useEffect(() => {
    if (products === undefined) {
      setRecomData([]);
    } else {
      const randomProducts = [...products].sort(() => 0.5 - Math.random());
      setRecomData(randomProducts);
    }
  }, [products]);

  return (
    <Box px={4} py={3}>
      <Typography variant="h5" my={1} sx={{ fontWeight: "bold", textAlign: "start" }}>
        MOST POPULAR RIGHT NOW
      </Typography>

      <Grid container>
        {recomData
          .filter((elem) => elem.proStatus === "Active")
          .slice(0, 4)
          .map((product, index) => (
            <Grid key={index} item xs={12} sm={6} md={3} p={1}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}

export default Trends;
