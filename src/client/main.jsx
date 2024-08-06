import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { TotalProvider } from "./context/MilkTotalContex";
// import { MonthlyDataProvider } from "./context/MonthlyData";
// import { CustomerAuthContext } from "./context/CutomerLoginContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <CustomerAuthContext> */}

        <App />
      {/* </CustomerAuthContext> */}
    </AuthProvider>
  </React.StrictMode>,
);
