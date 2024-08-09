import {
  Box,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  styled,
  Icon,
  Autocomplete,
  Container,
} from "@mui/material";
import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import CountrySelect from "../../component/country/CountrySelect";

const FooterDiv = styled("div")(({ theme, value }) => ({
  paddingTop: "40px",
  background: "#10847E",
  color: "#fff",
  textAlign: "start",
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

const Footer = () => {
  const supportItems = [
    "Contact us",
    "FAQs",
    "Promotions & Sale",
    "My Account",
    "Track Order",
    "Return Policy",
    "Privacy Policy",
    "Tech Glossary",
    "Terms & Conditions",
    "Initiate Return",
    "Cookie Settings",
  ];

  const aboutItems = [
    "Company",
    "Corporate News",
    "Press Center",
    "Investors",
    "Sustainability",
    "Careers",
    "Store Finder",
  ];

  return (
    <>
      <FooterDiv>
      <Container maxWidth="xl">
        <Grid container>
          <Grid item xs={12} md={4} p={2}>
            <Divider sx={{ borderStyle: "soild", borderColor: "#fff" }} />
            <Typography variant="h6" mt={3}>
              Support
            </Typography>
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                flexWrap: "wrap",
                paddingLeft: "0px",
              }}
            >
              {supportItems.map((item) => (
                <li
                  style={{ width: "50%", margin: "4px 0px", color: "#fff" }}
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} md={4} p={2}>
            <Divider sx={{ borderStyle: "soild", borderColor: "#fff" }} />
            <Typography variant="h6" mt={3}>
              About
            </Typography>
            <ul
              style={{
                listStyleType: "none",
                display: "flex",
                flexWrap: "wrap",
                paddingLeft: "0px",
              }}
            >
              {aboutItems.map((item) => (
                <li
                  style={{ width: "50%", margin: "4px 0px", color: "#fff" }}
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} md={4} p={2}>
            <Stack mb={4}>
              <Divider sx={{ borderStyle: "soild", borderColor: "#fff" }} />
              <Stack m={2}></Stack>
              <CountrySelect style={{marginTop:"20px"}}/>
            </Stack>
            <Stack>
              <Divider sx={{ borderStyle: "soild", borderColor: "#fff" }} />
              <Typography variant="h6" mt={3}>
                Explore Our Apps
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  margin: "20px 0px",
                }}
              >
                <Icon
                  sx={{
                    width: "max-content",
                    height: "50px",
                    marginRight: "10px",
                  }}
                >
                  <InstagramIcon sx={{ fontSize: "50px" }} />
                </Icon>
                <Icon
                  sx={{
                    width: "max-content",
                    height: "50px",
                    marginRight: "10px",
                  }}
                >
                  <TwitterIcon sx={{ fontSize: "50px" }} />
                </Icon>
                <Icon sx={{ width: "max-content", height: "50px" }}>
                  <FacebookIcon sx={{ fontSize: "50px" }} />
                </Icon>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} p={2}>
            <Divider sx={{ borderStyle: "soild", borderColor: "#fff" }} />
            <Box textAlign="center" my={2}>
              © 2023, All rights reserved. Made with love by ByteBros
            </Box>
          </Grid>
        </Grid>
        </Container>
      </FooterDiv>
    </>
  );
};

export default Footer;

