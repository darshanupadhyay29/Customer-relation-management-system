import React from "react";
import SideBar from "../Sidebar/SideBar";
import ShippingDataForm from "./ShippingDataForm";
import ShippingTableData from "./ShippingTableData";

const ShippingDetailsManagement = () => {
  return (
    <>
      <SideBar />
      <ShippingDataForm />
      <input type="text" className="but" class="srch" placeholder="Search" />
      <input
        type="button"
        className="but"
        value="Refresh"
        onClick={() => {
          window.location.reload();
        }}
      />

      <table border="1">
        <caption>Shipping Details</caption>

        <thead>
          <tr>
            <th>Address</th>
            <th>City</th>
            <th>Pin-code</th>
            <th>Customer-Id</th>
            <th>Product-Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{ShippingTableData()}</tbody>
      </table>
    </>
  );
};

export default ShippingDetailsManagement;
