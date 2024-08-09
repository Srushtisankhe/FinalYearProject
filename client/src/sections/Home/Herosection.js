import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  colors,
} from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import React from "react";

const Herosection = () => {
  return (
    <Box>
      {/* <Container maxWidth="xl" sx={{ height: "100%" }}> */}
      <Grid container spacing={2} sx={{ height: "80vh", overflow: "hidden" }}>
        <Grid item xs={12} md={8} sx={{ height: "100%" }}>
          <Box
            sx={{
              height: "100%",
              width: "100%",
              borderRadius: "2px",
              overflow: "hidden",
              backgroundColor: "#ECE1F1",
              position: "relative",
            }}
          >
            <Container
              maxWidth="md"
              style={{
                // border: "1px solid red",
                height: "100%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box
                sx={{ textAlign: "start", zIndex: 5, boxSizing: "border-box" }}
              >
                <Typography
                  variant="h2"
                  width={"500px"}
                  sx={{
                    marginBottom: "0px",
                    fontWeight: "bold",
                    color: "#393939",
                  }}
                >
                  New Antibacterial Surgical Mask
                </Typography>
                <Typography variant="h6" sx={{ color: "#444444" }}>
                  Face masks with inherent antimicrobial properties
                </Typography>
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    marginBottom: "15px",
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ margin: "10px 0px 0px", fontWeight: "bold" }}
                  >
                    ₹50.00{" "}
                  </Typography>
                  <Typography
                    style={{
                      color: "inherit",
                      textDecoration: "line-through",
                      marginLeft: "6px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    ₹62.00
                  </Typography>
                </Box>

                <Button
                  sx={{
                    bgcolor: "#10847E",
                    borderRadius: "30px",
                    padding: "10px",
                    width: "150px",
                    color: "#fff",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    "&:hover": {
                      color: "#10847E",
                      border: "1px solid",
                      borderColor: "#10847E",
                    },
                  }}
                >
                  Shop Now
                </Button>
              </Box>
            </Container>

            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(15%,-40%) scale(0.8,0.8)",
              }}
              src="https://medimela-react.envalabdemos.com/static/media/mask.9b4e1c1a36b083449f4c.png"
            ></img>
            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "35%",
                transform: "translate(-50%,-50%)",
                zIndex: "2",
                opacity: "0.8",
              }}
              src="https://medimela-react.envalabdemos.com/static/media/shape.b7f2272902017f5b1dd5.png"
            ></img>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} sx={{ height: "100%" }}>
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
            <Container maxWidth="lg">
              <Box
                style={{
                  textAlign: "start",
                  padding: "40px 0px 0px",
                  zIndex: "10 !important",
                  position:"relative"
                }}
              >
                <Typography variant="h6">Thermometer</Typography>
                <Typography
                  variant="h4"
                  sx={{
                    marginBottom: "0px",
                    fontWeight: "bold",
                    color: "#393939",
                  }}
                >
                  Digital Sx-1R
                </Typography>
              </Box>
            </Container>
            <img
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-45%) scale(0.8)",
                zIndex: "2 !important",
                // opacity: "0.8",
              }}
              src="https://medimela-react.envalabdemos.com/static/media/img-1.775629f0d38923b4d1c4.png"
            ></img>
            <Box
              style={{
                position: "absolute",
                bottom: "10%",
                right: "10%",
                transform: "translate(-0%,0%)",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "start",
                  // marginBottom: "15px",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ margin: "10px 0px 0px", fontWeight: "bold" }}
                >
                  ₹50.00{" "}
                </Typography>
                <Typography
                  style={{
                    color: "inherit",
                    textDecoration: "line-through",
                    marginLeft: "6px",
                    fontSize: "18px",
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  ₹62.00
                </Typography>
              </Box>

              <Button
                sx={{
                  bgcolor: "#10847E",
                  borderRadius: "30px",
                  padding: "10px",
                  width: "150px",
                  color: "#fff",
                  fontWeight: "bold",
                  margin: "10px 0px",
                  "&:hover": {
                    color: "#10847E",
                    border: "1px solid",
                    borderColor: "#10847E",
                  },
                }}
              >
                Shop Now
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* </Container> */}
    </Box>
  );
};

export default Herosection;
