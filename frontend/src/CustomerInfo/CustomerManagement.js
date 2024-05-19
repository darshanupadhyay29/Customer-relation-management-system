import React, { Component } from "react";
import SideBar from "../Sidebar/SideBar";
import CustomerFormWithToast from "./CustomerForm";
import customerTableData from "./customerTableData";

const CustomerManagement = () => {
  return (
    <>
          <SideBar />
          

      <CustomerFormWithToast />
      <input type="text" class="srch" placeholder="Search" />
      <input
        type="button"
        class="but"
        value="Refresh"
        onClick={() => {
          window.location.reload();
        }}
      />

      <table border="1">
        <caption>Cutomer Management</caption>

        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>E-mail</th>
            <th>Customer Id</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{customerTableData()}</tbody>
      </table>
    </>
  );
};

export default CustomerManagement;
