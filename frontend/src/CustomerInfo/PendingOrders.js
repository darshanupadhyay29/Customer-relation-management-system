import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingOrders = () => {
    const [pending, setPending] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                
                 const token = localStorage.getItem("token");
                const response = await axios.get("/pending", {
                  headers: {
                    Authorization: `Bearer ${token}`, // Attach token here
                  },
                });
                
                
                const { data } = response.data;
                setPending(data);
            } catch (error) {
                console.log(error);
            }
        }; fetchData()
    }, []);
    
    
  return (
    <div>{pending}</div>
  )
}

export default PendingOrders