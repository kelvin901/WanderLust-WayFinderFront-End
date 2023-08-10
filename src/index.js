import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ItineraryProvider } from './ItineraryContext';

ReactDOM.render(
  <React.StrictMode>    
    <BrowserRouter>
    <ItineraryProvider>
      <App />
      </ItineraryProvider>
    </BrowserRouter> 
  </React.StrictMode>,
  document.getElementById("root")
);
