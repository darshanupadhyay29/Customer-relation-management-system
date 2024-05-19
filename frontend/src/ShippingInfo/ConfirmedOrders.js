import React, { useEffect, useState } from "react";
import axios from "axios";

const ConfirmedOrders = () => {
  const [confirmed, setConfirmed] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const token = localStorage.getItem("token");
            
            
            const response = await axios.get("/confirmed", {
              headers: {
                Authorization: `Bearer ${token}`, // Attach token here
              },
            });
            
            
        const { count } = response.data; // Adjust to match the response structure
        setConfirmed(count); // Set the state with the count value
        console.log(count); // Log the count value
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return <div> {confirmed}</div>;
};

export default ConfirmedOrders;
