import React from "react";
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  styled,
  Box,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Link } from "react-router-dom";
import RegisterForm from "../sections/auth/RegisterForm";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const RegisterPage = () => {
  return (
    <Box>
      <Container maxWidth="sm">
        <StyledContent>
          <Typography variant="h4" gutterBottom>
            Register to MediMart
          </Typography>

          <Typography variant="body2" sx={{ mb: 5 }}>
            Do have an account? {""}
            <Link to="/login">Get Login</Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <GoogleIcon />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <FacebookOutlinedIcon />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined">
              <TwitterIcon />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>
          
          <RegisterForm/>
        </StyledContent>
      </Container>
    </Box>
  );
};

export default RegisterPage;
