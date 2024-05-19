import React, { useEffect, useState } from "react";
import axios from "axios";

const DashboardTableData = () => {
  const [dashboardData, setDashboardData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try {
             const token = localStorage.getItem("token");
            const response = await axios.get(
              "http://127.0.0.1:3000/dashboardData",
              {
                headers: {
                  Authorization: `Bearer ${token}`, // Attach token here
                },
              }
            );
              
            const { data } = response; // Correctly set data to response.data
       
          setDashboardData(data); // Update state with the actual data
          
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {dashboardData.map((data) => (
        <tr>
          <td>{data.name}</td>
          <td>{data.productName}</td>
          <td>{data.city}</td>
          <td>{data.address}</td>
          <td>{data.phone}</td>
          <td>{data.email}</td>
        </tr>
      ))}
    </>
  )
};

export default DashboardTableData;
