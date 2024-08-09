import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import StarBorder from "@mui/icons-material/StarBorder";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton, Stack } from "@mui/material";
import { categories } from "./navData";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function MobileDrawer() {
  const [state, setState] = React.useState({
    left: false,
    openSubmenu: null,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open, openSubmenu: null });
  };

  const handleTitleClick = (event, category) => {
    event.stopPropagation();
    setState((prevState) => ({
      ...prevState,
      openSubmenu: prevState.openSubmenu === category ? null : category,
    }));
  };

  const handleClose = () => {
    setState({ ...state, left: false, openSubmenu: null });
  };

  const list = (
    <Box
      sx={{ width: 350 }}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <Stack>
        <IconButton
          size="large"
          aria-haspopup="true"
          onClick={handleClose}
          color="inherit"
          sx={{ marginLeft: "auto" }}
        >
          <CloseOutlinedIcon sx={{ fontSize: 40 }} />
        </IconButton>
      </Stack>

      <List>
        {categories.map((category, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => handleTitleClick(event, category)}
                sx={{ fontWeight: "bold", fontSize: "20px" }}
              >
                <ListItemText primary={category.title}  primaryTypographyProps={{ fontWeight: "bold", fontSize: "20px" }}/>
                {category.items && (
                  <>
                    {state.openSubmenu === category ? (
                      <ExpandLess sx={{ fontSize: 30 }}/>
                    ) : (
                      <ExpandMore sx={{ fontSize: 30 }}/>
                    )}
                  </>
                )}
              </ListItemButton>
            </ListItem>
            {category.items && (
              <Collapse
                in={state.openSubmenu === category}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {category.items.map((item, subIndex) => (
                    <ListItem key={subIndex} disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={item} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={toggleDrawer("left", true)}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor="left"
        open={state.left}
        onClose={toggleDrawer("left", false)}
        onOpen={toggleDrawer("left", true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
