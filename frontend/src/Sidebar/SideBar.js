import React from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
  return (
    <>      
        <div className="sidenav">
          <NavLink to="/home">Dashboard</NavLink>
          <br />
          <br />
          <NavLink to="/home/customer">Customer Management</NavLink>
          <br />
          <br />
          <NavLink to="/home/purchaseorder">Purchase Order Management</NavLink>
          <br />
          <br />
          <NavLink to="/home/shippingdetails">
            Shipping Details Management
          </NavLink>

        </div>
    </>
  );
}

export default SideBar;
