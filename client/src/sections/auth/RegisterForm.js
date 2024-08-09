import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Button,
  Divider,
  Typography,
} from "@mui/material";
import { endpoints } from "../../api";

// ----------------------------------------------------------------------

const RegisterForm = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contact: "+91",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    if (!formData.contact) {
      errors.contact = "Contact number is required";
    } else if (!/^\+?91\d{10}$/.test(formData.contact)) {
      errors.contact = "Invalid contact number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  console.log(formErrors)

  const handleClick = async () => {
    if (validateForm()) {
      try {
        setSubmitting(true);
        const response = await axios.post(endpoints.user.signup, formData);
        console.log(response.data);
        navigate("/login", { replace: true });
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="username"
          label="Enter username"
          value={formData.username}
          onChange={handleChange}
          error={Boolean(formErrors.username)}
          helperText={formErrors.username}
        />
        <TextField
          name="email"
          label="Email address"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                ></IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          name="contact"
          label="Contact number"
          value={formData.contact}
          onChange={handleChange}
          error={Boolean(formErrors.contact)}
          helperText={formErrors.contact}
        />
      </Stack>

      <Divider sx={{ my: 3 }}></Divider>

      <Button
        fullWidth
        size="large"
        type="submit"
        style={{ backgroundColor: "#000", color: "#fff" }}
        onClick={handleClick}
        disabled={submitting}
      >
        {submitting ? "Signing up..." : "Sign up"}
      </Button>
    </>
  );
};

export default RegisterForm;
