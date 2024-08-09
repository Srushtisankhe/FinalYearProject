import { Box, Button, Container, Stack, Typography } from "@mui/material";
import React from "react";

const BannerSection = () => {
  return (
    <Box sx={{ height: "35vh", margin: "50px 0px" }}>
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Box
          sx={{
            borderRadius: "20px",
            height: "100%",
            width: "100%",
            // backgroundColor: "#064acb",
            backgroundColor: "#10847E",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            style={{
              position: "absolute",
              top: "0%",
              left: "0%",
              bottom: "0%",
              right: "0%",
              zIndex: "2 !important",
              // opacity: "0.8",
            }}
            src="https://medimela-react.envalabdemos.com/static/media/cta-bg1.2642c4c11396dd21ce7b.png"
          ></img>

          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-20%,-50%)",
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
                fontSize:"12px",
                textAlign:"center",
                color:"#fff"
              }}
            >
              New Product
            </Stack>
            <Typography variant="h4" color="inherit">
              {" "}
              Save Unto 10% Extra Enjoy FREE Delivery With PLUS Membership
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
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          <img
            style={{
              position: "absolute",
              top: "45%",
              left: "25%",
              transform: "translate(-50%,-50%)",
              zIndex: "2 !important",
              // opacity: "0.8",
            }}
            src="https://medimela-react.envalabdemos.com/static/media/left-img.befbc3baf0abf3730795.png"
          ></img>
        </Box>
      </Container>
    </Box>
  );
};

export default BannerSection;
