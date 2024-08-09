import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import labTestData from "./labtestdata";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";

const Labtest = () => {
  return (
    <Box style={{ marginTop: "150px" }}>
      <Container maxWidth="xl">
        <Stack textAlign="start" sx={{ py: 2 }}>
          <Breadcrumbs separator="/" aria-label="breadcrumb" sx={{ my: 2 }}>
            <Link underline="hover" color="inherit" to="/">
              Home
            </Link>
            <Typography color="text.primary">Lab Test</Typography>
          </Breadcrumbs>
          <Typography variant="h4" my={1} textAlign="start" fontWeight="bold">
          Lab Tests
        </Typography>
        </Stack>

        <Divider />
        <Grid container spacing={3} my={2}>
          {labTestData.map((test, index) => (
            <Grid item key={index} xs={12} md={3}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  border: "0.5px solid",
                  borderColor: "#D3D3D3",
                  borderRadius: "10px",
                  textAlign: "start",
                }}
              >
                <CardMedia
                  component="img"
                  height="150"
                  image="https://source.unsplash.com/featured/?medical"
                  alt="Lab Test"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {test.testName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      // textOverflow: "ellipsis",
                      // whiteSpace: "nowrap",
                      height: "3.6em", // Adjust height to show three lines of text
                      lineHeight: "1.2em",
                    }}
                  >
                    {test.description}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mt={2}
                    textAlign="start"
                  >
                    <Box>
                      <Typography variant="body1">
                        {test.schedule.time} - {test.schedule.mealTiming}
                      </Typography>
                      <Typography variant="body1">
                        Price: <span style={{fontWeight:"bold"}}>₹{test.price}</span>
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton>
                        <ShoppingCartOutlinedIcon
                          style={{ fontSize: "28px", color: "#10847E" }}
                        />
                      </IconButton>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Labtest;
