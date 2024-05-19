import React from "react";
import SideBar from "../Sidebar/SideBar";
import ListProducts from "./ListProducts";
import ProductTableData from "./ProductTableData";

const PurchaseOrderManagement = () => {
    return (
      <>
        <SideBar />
        <ListProducts />
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
          <caption>Purchase Orders</caption>

          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Pricing</th>
              <th>MRP</th>
              <th>Product Id</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{ProductTableData()}</tbody>
        </table>
        <div />
      </>
    );
};

export default PurchaseOrderManagement;
