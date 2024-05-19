import React from "react";
import Box from "@mui/material/Box";

import SideBar from "../Sidebar/SideBar";
import CustomerCount from "../CustomerInfo/CustomerCount";
import DashboardTableData from "./DashboardTableData";
import TotalSales from "../ProductInfo/TotalSales";
import ConfirmedOrders from "../ShippingInfo/ConfirmedOrders";
import PendingOrders from "../CustomerInfo/PendingOrders";
//Box 1=Total customers  Box2-Pending orders Box3=Confirmed orders Box4=Total sales
const Dashboard = () => {
      
  return (
      <>
      <SideBar />
      <div className="boxes">
        <Box
         
          height={200}
          width={200}
          color="black"
          backgroundColor="white"
          fontSize={30}
          my={4}
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          Total Customers
          <br />
          <br />
          <br />
          {CustomerCount()}
        </Box>
        <Box
         
          height={200}
          width={200}
          color="black"
          backgroundColor="white"
          my={4}
          fontSize={30}
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          Total sales(In Rs.)
          <br />
          <br />
          {TotalSales()}
        </Box>
        <Box
         
          height={200}
          width={200}
          color="black"
          backgroundColor="white"
          my={4}
          fontSize={30}
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          Pending orders
          <br />
          <br />
          <br />
          {PendingOrders()}
        </Box>
        <Box
        
          height={200}
          width={200}
          color="black"
          backgroundColor="white"
          my={4}
          fontSize={30}
          gap={4}
          p={2}
          sx={{ border: "2px solid grey" }}
        >
          Confirmed orders
          <br />
          <br />
          <br />
          {ConfirmedOrders()}
        </Box>
      </div>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Product Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Phone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>{DashboardTableData()}</tbody>
      </table>
      
    </>
  );
};

export default Dashboard;
