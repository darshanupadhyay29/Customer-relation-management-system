import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const ShippingTableData = () => {
  const [shippingData, setShippingData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
        try {
           const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:3000/shippingdata", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        });
       
          const { data } = response;
          console.log(data);
        
        setShippingData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
    


  const handleDelete = async (customerid,productid) => {
      try {
          // Send a delete request to the backend to delete the customer with the given ID
          await axios.delete(`http://127.0.0.1:3000/home/cancelshipping/${productid}?customerid=${customerid}`);

          // Remove the deleted shipping data from the state
         setShippingData(
           shippingData.filter(
             (data) =>
               !(data.customerId === customerid && data.productId === productid)
           )
         );
      } catch (error) {
          console.error('Error deleting customer:', error);
      }
  };

  return (
    <>
      {shippingData.map((data) => (
        <tr>
          <td>{data.address}</td>
          <td>{data.city}</td>
          <td>{data.pincode}</td>
          <td>{data.customerId}</td>
          <td>{data.productId}</td>
          <td>
            <input
              type="button"
              value="Delete"
              onClick={() => {
                handleDelete(data.customerId, data.productId);
              }}
            />
            <EditButton data={data} />
          </td>
        </tr>
      ))}
    </>
  );
}


const EditButton = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [pincode, setPincode] = useState();
  const [customerId, setCustomerId] = useState();
  const [productId, setProductId] = useState();

  const handleInpt = (event) => {
    const { name, value } = event.target;

    if (name === "address") setAddress(value);
    else if (name === "city") setCity(value);
    else if (name === "pincode") setPincode(value);
    else if (name === "customerId") setCustomerId(value);
    else if (name === "productId") setProductId(value);
  };

  const HandleSave = async (event) => {
    event.preventDefault();

    try {
      const pid = data.productId;
      const cid = data.customerId;
      const response = await fetch(
        `http://localhost:3000/updateShipping/${pid}?customerid=${cid}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address,
            city,
            pincode,
            customerId,
            productId,
          }),
        }
      );
      setShowForm(false);

      const daata = await response.text();
      alert(daata); // Display success message
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the student.");
    }
  };

  const handleEditClick = () => {
    setShowForm(true);
  };

  return (
    <>
      <button onClick={handleEditClick}>
        <i className="fas fa-edit"></i> Edit
      </button>

      {showForm && (
        <div className="overlay">
          <Box
            className="centered-form"
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-name"
                label="Address"
                name="address"
                onChange={handleInpt}
                defaultValue={data.address}
              />
              <TextField
                id="outlined-city"
                label="City"
                name="city"
                onChange={handleInpt}
                defaultValue={data.city}
              />
            </div>
            <div>
              <TextField
                id="outlined-phone"
                label="Pincode"
                name="pincode"
                onChange={handleInpt}
                defaultValue={data.pincode}
              />
              <TextField
                id="outlined-email"
                label="CustomerId"
                name="customerId"
                onChange={handleInpt}
                defaultValue={data.customerId}
              />
            </div>
            <div>
              <TextField
                id="outlined-id"
                label="ProductID"
                name="productId"
                onChange={handleInpt}
                defaultValue={data.productId}
              />
            </div>
            <input
              type="button"
              value="Cancel"
              onClick={() => setShowForm(false)}
            />
            <input type="button" value="Save" onClick={HandleSave} />
          </Box>
        </div>
      )}
    </>
  );
};



export default ShippingTableData;