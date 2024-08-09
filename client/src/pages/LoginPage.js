import React from "react";
import {
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  styled,
  Box,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import Iconify from "../component/iconify/Iconify";
import { Link } from "react-router-dom";
import LoginForm from "../sections/auth/LoginForm";
import zIndex from "@mui/material/styles/zIndex";

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "1fr",
  },
  gridTemplateColumns: "1fr",
  overflow: "none",
  height: "100vh",
}));

const StyledSection = styled("div")(({ theme }) => ({
  // backgroundImage:
  //   "url(https://www.netmeds.com/images/cms/wysiwyg/cms/1680000865_New_Dest_deal.png)",
  //   backgroundRepeat:"no-repeat",
  overflow:"hidden",
  position:"relative",
    
}));

const StyledContent = styled("div")(({ theme }) => ({
  width: "100%",
}));

const LoginPage = () => {
  const isMobileScreen = useMediaQuery("(max-width: 600px)");

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:4000/auth/google';
  };

  return (
    <Box sx={{ position: "relative" }}>
      {/* <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "1fr",
          width: "100%",
          padding:"6px 40px",
          alignItems:"center",
        }}
      >

        <div style={{marginLeft:"auto"}}>
          <IconButton onClick={onClose}>
            <Iconify icon="ph:x-bold" color="#000" height={35} width={35}/>
          </IconButton>
        </div>
      </Stack> */}
      <StyledRoot>
        <StyledSection sx={{ display: isMobileScreen ? "none" : "" }}>
          {/* Content for the first column */}
          <img style={{height:"100%", width:"100%"}} src="https://www.netmeds.com/images/cms/wysiwyg/cms/1680000865_New_Dest_deal.png"></img>
          <Box style={{position:"absolute",fontSize:"30px", fontWeight:"bold",color:"#fff",backgroundColor:"#40CDCF",  top:"22%", left:"15%" , transfrom:"translate(-50%,-50%)", zIndex:99}}>MediMart.com</Box>
        </StyledSection>

        <Container
          maxWidth="sm"
          sx={{ display: "flex", alignItems: "center", height: "100%" }}
        >
          <StyledContent>
            <Typography variant="h4" gutterBottom style={{fontWeight:"bold"}}>
              Sign in
            </Typography>

            <Typography variant="h6" sx={{ mb: 5 }}>
              Welcome Back!!!
            </Typography>
            <Stack direction="row" spacing={2} height={"45px"}>
              <Button fullWidth size="large" color="inherit" variant="outlined" onClick={()=>handleGoogleLogin()}>
                <Iconify
                  icon="eva:google-fill"
                  color="#DF3E30"
                  width={25}
                  height={25}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:facebook-fill"
                  color="#1877F2"
                  width={25}
                  height={25}
                />
              </Button>

              <Button fullWidth size="large" color="inherit" variant="outlined">
                <Iconify
                  icon="eva:twitter-fill"
                  color="#1C9CEA"
                  width={25}
                  height={25}
                />
              </Button>
            </Stack>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                OR
              </Typography>
            </Divider>

            <LoginForm />
            <Typography variant="body2" sx={{ margin: "15px auto" , textAlign:"center"}}>
              Don’t have an account? <Link to="/register">Get started</Link>
            </Typography>
          </StyledContent>
        </Container>
      </StyledRoot>
    </Box>
  );
};

export default LoginPage;
