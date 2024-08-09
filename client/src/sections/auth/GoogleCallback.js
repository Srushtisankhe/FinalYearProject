import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const GoogleCallbackHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("code");
  
    if (code) {
      axios.get("http://localhost:4000/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` // Retrieve JWT token from localStorage
        }
      })
        .then(response => {
          console.log("User data:", response.data);
          navigate("/");
        })
        .catch(error => {
          console.error("Error calling user API:", error);
        });
    }
  }, [location, navigate]);

  return (
    <div>
      <p>Handling Google Callback...</p>
    </div>
  );
};

export default GoogleCallbackHandler;
