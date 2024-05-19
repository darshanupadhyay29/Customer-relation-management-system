import { Component } from "react";
import "./App.css";
import Login from "./RegisterationPages/Again";
import SignUp from "./RegisterationPages/signUp";
import { Route, Routes } from "react-router-dom";
import ShippingDetailsManagement from "./ShippingInfo/ShippingDetailsManagement";
import PurchaseOrderManagement from "./ProductInfo/PurchaseOrderManagement";
import CustomerManagement from "./CustomerInfo/CustomerManagement";
import Dashboard from "./DashboardInfo/Dashboard";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={SignUp} exact />

        <Route path="/login" Component={Login} exact />

        <Route
          path="/home"
          Component={Dashboard}
          exact
        />
        <Route path="/home/customer" Component={CustomerManagement} exact />
        <Route
          path="/home/purchaseorder"
          Component={PurchaseOrderManagement}
          exact
        />
        <Route
          path="/home/shippingdetails"
          Component={ShippingDetailsManagement}
          exact
        />
      </Routes>
    </>
  );
}

export default App;
