import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import styled from "styled-components";
import ScrollTop from "./ScrollTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MaxWidth = styled("div")({
  maxWidth: "1600px",
  margin: "0px auto",
  overflowX:"hidden"
});

function App() {
  return (
    <div className="App">
      {/* <MaxWidth> */}
        <BrowserRouter>
        <ScrollTop>
          <Router />
          </ScrollTop>
        </BrowserRouter>
      {/* </MaxWidth> */}
    </div>
  );
}

export default App;
