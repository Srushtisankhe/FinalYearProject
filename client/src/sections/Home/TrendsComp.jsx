import React from "react";
import Grid from "@mui/material/Grid";
import { Box, Button, Stack, Typography } from "@mui/material";

const TrendItem = ({ imageSrc, title, subtitle }) => (
  <Grid item xs={12} md={6} p={2}>
    <div style={{ overflow: "hidden" }}>
      <img
        src={imageSrc}
        alt={title}
        style={{
          width: "100%",
          height: "500px",
          objectFit: "cover",
        }}
      />
      <Stack p={1}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
        <Button
          style={{
            width: "max-content",
            padding: "8px 50px",
            background: "#000",
            color: "#fff",
            fontSize: "18px",
            margin: "5px auto",
          }}
        >
          SHOP NOW
        </Button>
      </Stack>
    </div>
  </Grid>
);

const TrendsComp = () => {
  return (
    <Box p={3} pb={3}>
      <Typography mt={5} variant="h4">
        TRY ON WHAT'S TRENDING
      </Typography>
      <Grid container mt={4}>
        <TrendItem
          imageSrc="https://www.horizont.net/news/media/14/Puma---Forever-Faster-Training-Usain-Bolt-139406.jpeg"
          title="SNEAKER"
          subtitle="KICK UP A NOTCH"
        />
        <TrendItem
          imageSrc="https://www.fitnessmag.co.za/wp-content/uploads/2020/08/Banele-Shabangu-by-David-Tarpey.jpg"
          title="SNEAKER"
          subtitle="KICK UP A NOTCH"
        />
      </Grid>
    </Box>
  );
};

export default TrendsComp;
