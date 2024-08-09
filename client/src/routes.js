import React, { useState, useEffect } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { useCookies } from "react-cookie";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Page404 from "./pages/Page404";
import MainLayout from "./layout";
import Shop from "./pages/Shop";
import CategoryRelat from "./sections/category/CategoryRelat";
import ProductDetails from "./sections/products/ProductDetails";
import PrescUpload from "./pages/PrescUpload";
import CartPage from "./pages/CartPage";
import { jwtDecode } from "jwt-decode";
import BookingPage from "./pages/BookingPage";
import Labtest from "./pages/Labtest";
import AboutPage from "./pages/AboutPage";
import OrderPage from "./pages/OrderPage";
import SchedulePage from "./sections/Home/SchedulePage";
import MedicationPage from "./pages/MedicationPage";

export const Router = () => {
  const [cookies] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's authentication status
  const [details, setDetails] = useState({}); // State to store user details

  useEffect(() => {
    const userCookie = cookies.token;
    if (userCookie) {
      const decoded = jwtDecode(userCookie);
      setDetails(decoded);
      setIsLoggedIn(true); 
    } else {
      setDetails({});
      setIsLoggedIn(false); 
    }
  }, []);

  const userRoutes = [
    { path: "/", element: <Home /> },
    { path: "/shop", element: <Shop /> },
    { path: "/category/:id", element: <CategoryRelat/> },
    { path: "/productDetails/:id", element: <ProductDetails /> },
    { path: "/prescription", element: <PrescUpload/> },
    { path: "/cart", element: <CartPage /> },
     {path:"/checkout", element:<BookingPage/>},
     {path:"/labtest", element:<Labtest/>},
     {path:"/aboutus", element:<AboutPage/>},
     {path:"/order", element:<OrderPage/>},
     {path:"/schedule", element:<MedicationPage/>},
     {path:"/form", element:<SchedulePage/>}
  ];

  const routes = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        ...userRoutes,
        // { path: "auth/google/callback", element: <GoogleCallbackHandler /> },
      ],
      exact: true,
    },
    {
      path: "/login",
      element: isLoggedIn ? <Navigate to="/" /> : <LoginPage setLoggedIn={setIsLoggedIn} />,
    },
    {
      path: "/register",
      element: isLoggedIn ? <Navigate to="/" /> : <RegisterPage setLoggedIn={setIsLoggedIn} />,
    },
    {
      path: "/404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};
