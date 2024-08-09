import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
//  @mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  useMediaQuery,
  useScrollTrigger,
} from "@mui/material";

// icons
import AdbIcon from "@mui/icons-material/Adb";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

// custom imports
import Brandheader from "./headerSection/Brandheader";
import SearchBar from "./headerSection/SearchBars";
import MobileDrawer from "./headerSection/MobileMenu";
import MenuItems from "./headerSection/Menu";
import AccountPopover from "./headerSection/AccountPopover";
import Cookies from "universal-cookie";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const buttonStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textTransform: "none",
  backgroundColor: "#EDF2F4",
  // color:"#fff",
  border: "0.5px solid",
  borderColor: "#D3D3D3",
  a: { color: "#696969" },
};

const Navbar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [scrolled, setScrolled] = useState(false);
  const prevScrollY = useRef(0);
  const [details, setDetails] = useState({});
  const cookies = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    const userCookie = cookies.get("token");
    if (userCookie) {
      const decoded = jwtDecode(userCookie);
      // console.log(decoded);
      setDetails(decoded);
    } else {
      setDetails({});
    }
  }, []);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (prevScrollY.current > 0 && currentScrollY <= 0) {
      setScrolled(false);
    } else if (prevScrollY.current <= 0 && currentScrollY > 0) {
      setScrolled(true);
    }
    prevScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isMediumScreen = useMediaQuery("(min-width:900px)");

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = () => {
    navigate("/cart");
  };

  const handleClickPres = () => {
    navigate("/prescription");
  };

  const navItems = [
    { name: "Medicine", navlink: "/shop" },
    { name: "Lab Tests", navlink: "/labtest" },
    { name: "About Us", navlink: "/aboutus" },
    { name: "Health Blogs", navlink: "" },
    { name: "Plus", navlink: "" },
    { name: "Offers", navlink: "" },
    { name: "Value Store", navlink: "" },
  ];
  return (
    <>
      <Brandheader isScrolled={scrolled} />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            zIndex: 999,
            bgcolor: "#fff",
            color: "#696969",
            position: "fixed",
            top: scrolled ? 0 : "30px",
            boxShadow: "0 -5px 15px rgba(8,106,216,.29)",
            borderBottom: "0.5px solid",
            borderColor: "#D3D3D3",
          }}
        >
          <Box sx={{ borderBottom: "0.5px solid", borderColor: "#D3D3D3" }}>
            <Container maxWidth="xl">
              <Toolbar
                disableGutters
                id="app-bar-with-responsive-menu"
                style={{ position: "relative" }}
              >
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <MobileDrawer />
                </Box>
                {/* <img src="./logo12.jpg" width={80} height={80}/> */}
                <img src="/medical-logo.jpg"  width={80} height={80} />
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  smooth
                  duration={500}
                >
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      ml: "-10px",
                      display: { xs: "none", md: "flex" },
                      fontFamily: "monospace",
                      fontWeight: "bold",
                      letterSpacing: ".2rem",
                      color: "#10847E",
                      textDecoration: "none",
                      fontSize: "26px",
                    }}
                  >
                    MEDIMART
                  </Typography>
                </Link>
                <Box
                  sx={{
                    flexGrow: 1,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <SearchBar />
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                  size="large"
                  color="inherit"
                  sx={buttonStyle}
                  onClick={handleClickPres}
                >
                  <ReceiptLongOutlinedIcon sx={{ marginRight: "0.5rem" }} />
                  Upload Now
                </Button>
                <IconButton size="large" color="inherit">
                  <FavoriteBorderOutlinedIcon />
                </IconButton>
                <IconButton size="large" color="inherit" onClick={handleClick}>
                  <LocalMallOutlinedIcon />
                </IconButton>

                <IconButton size="large" color="inherit">
                  <AccountPopover userData={details} />
                </IconButton>
              </Toolbar>
            </Container>
          </Box>
          <Box>
            <Container maxWidth="md">
              <Stack sx={{}}>
                <ul
                  className="navitems"
                  style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: "0px",
                    margin: "12px 0px",
                  }}
                >
                  {navItems.map((elem, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: "14px",
                        fontFamily: "Inter",
                        fontStyle: "normal",
                        fontWeight: "600",
                        color: "#696969",
                      }}
                    >
                      <Link
                        style={{ color: "inherit", textDecoration: "none" }}
                        to={`${elem.navlink}`}
                      >
                        {elem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Stack>
            </Container>
          </Box>
        </AppBar>
      </HideOnScroll>
    </>
  );
};

export default Navbar;
