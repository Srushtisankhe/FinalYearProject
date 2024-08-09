import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Container, Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { DesktopNavCategories } from "./navData";

const MenuColumn = ({ title, items }) => (
  <Grid item xs={12} sm={6} md={3} sx={{padding:"20px"}}>
    <Box sx={{borderBottom:"4px solid #000", marginBottom:"10px"}}>
      <Typography variant="h6" fontWeight="bold">
        {title}
      </Typography>
    </Box>

    <ul style={{ padding: "0px", listStyleType: "none", marginTop: "0px" }}>
      {items?.map((text, index) => (
        <li key={index} style={{fontSize:"17px", fontFamily:"sans-serif", margin:"6px 0px"}}>{text}</li>
      ))}
    </ul>
  </Grid>
);

const MenuItem = ({ menuItems }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleDrawer = (open) => {
    setDrawerOpen(open);
  };

  const handleMouseEnter = (item) => {
    setDrawerOpen(true);
    setSelectedCategory(item);
  };

  const handleDrawerMouseEnter = () => {
    setDrawerOpen(true);
  };

  const handleDrawerMouseLeave = () => {
    setDrawerOpen(false);
  };

  const anchor = "top";

  const filteredCategories = DesktopNavCategories.find(
    (category) => category.menuItem === selectedCategory
  );

  return (
    <>
      {menuItems.map((item) => (
        <Button
          key={item}
          onMouseEnter={() => handleMouseEnter(item)}
          // onMouseLeave={handleMouseLeave}
          sx={{
            color: "white",
            display: "block",
            fontSize: "16px",
            textTransform: "capitalize",
            height: "100%",
            position: "relative",
            "&:hover::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "2.5px",
              backgroundColor: "white",
            },
          }}
        >
          {item}
        </Button>
      ))}
      <SwipeableDrawer
        anchor={anchor}
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        onMouseEnter={handleDrawerMouseEnter}
        onMouseLeave={handleDrawerMouseLeave}
        sx={{ zIndex: 99 }}
      >
        <Box
          sx={{
            width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
            pt: "80px",
          }}
          role="presentation"
          onMouseEnter={() => setDrawerOpen(true)}
          onMouseLeave={() => setDrawerOpen(false)}
        >

        </Box>
      </SwipeableDrawer>
    </>
  );
};

MenuItem.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MenuItem;
