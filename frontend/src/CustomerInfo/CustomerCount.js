import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CustomerCount = () => {
    const [count, setCount] = useState(0); // Initialize count state

    useEffect(() => {
        const fetchData = async () => {
            try {
                 const token = localStorage.getItem("token");
                const response = await axios.get(
                  "http://127.0.0.1:3000/home/customercount",
                  {
                    headers: {
                      Authorization: `Bearer ${token}`, // Attach token here
                    },
                  }
                );
                
                
               setCount(response.data.response)
                
                // Set count state with the fetched count value
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call fetchData function when the component mounts
    }, []); // Empty dependency array ensures useEffect runs only once when the component mounts

    return (
        <div>          
         {count}         
        </div>
    );
};

export default CustomerCount;
