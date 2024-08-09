import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  Typography,
  Stack,
  MenuItem,
  IconButton,
  Popover,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "../../../redux/auth/Action";
import Iconify from "../../../component/iconify/Iconify";

const MENU_OPTIONS = [
  {
    label: "Profile",
    icon: "eva:person-fill",
    path: "/profile",
  },
  {
    label: "Order",
    icon: "eva:settings-2-fill",
    path: "/order",
  },
  {
    label: "Medication",
    icon: "eva:settings-2-fill",
    path: "/schedule",
  },
];

const AccountPopover = ({ userData, textColor }) => {
  const [open, setOpen] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = !!userData.email;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    // navigate("/order")
    setOpen(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/login");
  };

  return (
    <>
      <Iconify
        icon="material-symbols:person"
        onClick={handleOpen}
        width={31}
        height={31}
      />

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {isLoggedIn ? (
          <>
            <Box sx={{ my: 1.5, px: 2.5 }}>
              <Typography variant="subtitle2" noWrap>
                {userData.userName}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary" }}
                noWrap
              >
                {userData.email}
              </Typography>
            </Box>
            <Divider sx={{ borderStyle: "dashed" }} />
            <Stack sx={{ p: 1 }}>
              {MENU_OPTIONS.map((option) => (
                <MenuItem
                  key={option.label}
                  onClick={() => handleMenuItemClick(option.path)}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Stack>
            <Divider sx={{ borderStyle: "dashed" }} />
            <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/login"
              sx={{ m: 1 }}
            >
              Login
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              component={Link}
              to="/register"
              sx={{ m: 1 }}
            >
              Sign Up
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
};

AccountPopover.propTypes = {
  userData: PropTypes.object,
  textColor: PropTypes.string,
};

export default AccountPopover;
