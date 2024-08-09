import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import EmojiTransportationOutlinedIcon from "@mui/icons-material/EmojiTransportationOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

const LoyaltyFeatures = () => {
  const features = [
    {
      title: "Know What You Pay For",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: (
        <VerifiedUserOutlinedIcon sx={{ fontSize: 48, color: "#F3A952" }} />
      ),
    },
    {
      title: "Free Shipping Over $20",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: (
        <LocalShippingOutlinedIcon sx={{ fontSize: 48, color: "#F3A952" }} />
      ),
    },
    {
      title: "Store Locator",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: <StoreOutlinedIcon sx={{ fontSize: 48, color: "#F3A952" }} />,
    },
    {
      title: "Free Servicing",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: (
        <AirportShuttleOutlinedIcon sx={{ fontSize: 48, color: "#F3A952" }} />
      ),
    },
    {
      title: "100% Quality Product",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: (
        <EmojiTransportationOutlinedIcon
          sx={{ fontSize: 48, color: "#F3A952" }}
        />
      ),
    },
    {
      title: "Speed Perks",
      description:
        "I have been a loyal customer of this auto parts company for years.",
      icon: <SpeedOutlinedIcon sx={{ fontSize: 48, color: "#F3A952" }} />,
    },
  ];
  return (
    <Box style={{ padding: "40px 0px 40px", backgroundColor: "#ECF3F7" }}>
      <Container maxWidth="xl">
        <Typography variant="h4" color="#4F585E" fontWeight="bold" my={2}>
          Know What You Pay For
        </Typography>
        <Grid container spacing={4} my={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} p={1} key={index}>
              <Box style={{backgroundColor:"#fff", padding:"40px 20px"}}>
                {feature.icon}
                <Typography variant="h6">{feature.title}</Typography>
                <Typography>{feature.description}</Typography> 
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default LoyaltyFeatures;
