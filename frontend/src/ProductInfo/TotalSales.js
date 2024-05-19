import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TotalSales = () => {
    const [sales, setSales] = useState(0);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("/totalsales", {
                  headers: {
                    Authorization: `Bearer ${token}`, // Attach token here
                  },
                });
                
                
                const { totalSales } = response.data;
            
                setSales(totalSales);
                console.log(totalSales);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    
  return (
      <>
          <p>{sales}</p>
      </>
  )
}

export default TotalSales