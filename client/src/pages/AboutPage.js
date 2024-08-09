import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

const AboutPage = () => {
  return (
    <Box sx={{ marginTop: "180px" }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          {/* Large image */}

          <Grid item xs={12}>
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "#222222",
                }}
                gutterBottom
              >
                About Us
              </Typography>
              <Typography variant="body1" paragraph>
                At our pharmacy, we are dedicated to providing high-quality
                medicines to our customers. We offer a wide range of products to
                meet your healthcare needs.
              </Typography>
              <Typography variant="body1" paragraph>
                Our team of pharmacists is committed to ensuring that you
                receive the best possible care and advice. Whether you need
                over-the-counter medications or prescription drugs, we are here
                to help.
              </Typography>
              <Typography variant="body1" paragraph>
                We understand the importance of health and well-being, and we
                strive to make your experience with us as convenient and
                pleasant as possible. Thank you for choosing us for your
                healthcare needs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <img
                src={"https://source.unsplash.com/featured/?medical"}
                alt="About Us"
                style={{ width: "100%", height: "auto" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;
