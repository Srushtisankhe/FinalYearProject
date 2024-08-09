import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth/Action";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const responseError = useSelector((state) => state.auth?.loginError);

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Please provide your email.";
    } else {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    if (!password) {
      newErrors.password = "Please enter your password.";
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => !error);
  };

  // const handleLogin = async (event) => {
  //   event.preventDefault();

  //   if (validateForm()) {
  //     setLoading(true);
  //     const success = await dispatch(login(email, password));
  //     setLoading(false);
  //     if (success) {
  //       navigate("/");
  //     }
  //   }
  // };

  const handleLogin = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);
      try {
        const response = await dispatch(login(email, password));
        if (response && response.status === 200) {
          navigate("/");
        } else {
          console.log("try again")
        }
      } catch (error) {
        console.log("Login error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "",
    }));
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "",
    }));
  };

  return (
    <form onSubmit={handleLogin}>
      {" "}
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email Address"
          value={email}
          onChange={handleEmailChange}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={handlePasswordChange}
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {/* Add your eye icon here */}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {responseError && (
          <Typography variant="body2" color="error">
            {responseError}
          </Typography>
        )}
      </Stack>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover" to="/forgot-password">
          Forgot password?
        </Link>
      </Stack>
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        style={{ backgroundColor: "#10847E", color: "#fff", cursor: "pointer" }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </form>
  );
}

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import {
//   Link,
//   Stack,
//   IconButton,
//   InputAdornment,
//   TextField,
//   Checkbox,
//   Button,
//   Typography,
// } from "@mui/material";
// import { login } from "../../redux/auth/Action";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const error = useSelector((state) => state.auth.error);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleClick = async () => {
//     try {
//       await dispatch(login(formData.userName, formData.userPassword));
//       navigate("/", { replace: true });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
//       <Stack spacing={3}>
//         <TextField
//           name="email"
//           label="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <TextField
//           name="password"
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           value={formData.password}
//           onChange={handleChange}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={togglePasswordVisibility} edge="end">
//                   {showPassword ? "🙈" : "👁️"}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />
//       </Stack>

//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//         sx={{ my: 1 }}
//       >
//         <Checkbox name="remember" label="Remember me" />
//         <Link variant="subtitle2" underline="hover">
//           Forgot password?
//         </Link>
//       </Stack>

//       {error && <div>{error}</div>}

//       <Button
//         fullWidth
//         size="large"
//         type="submit"
//         style={{ backgroundColor: "#000", color: "#fff" }}
//         onClick={handleClick}
//       >
//         Login
//       </Button>

//     </>
//   );
// };

// export default LoginForm;
