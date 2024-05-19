import React, { useEffect, useState } from "react";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const CustomerTableData = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
        try {
           const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://127.0.0.1:3000/home/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token here
            },
          }
        );
       
        const { data } = response;
       
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (customerid) => {
    try {
      // Send a delete request to the backend to delete the customer with the given ID
      await axios.delete(
        `http://127.0.0.1:3000/home/customersdata/${customerid}`
      );

      // Remove the deleted customer from the state
      setCustomers(
        customers.filter((customer) => customer._id !== String(customerid))
      );
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <>
      {customers.map((customer) => (
        <tr key={customer._id}>
          <td>{customer.name}</td>
          <td>{customer.city}</td>
          <td>{customer.phone}</td>
          <td>{customer.email}</td>
          <td>{customer._id}</td>
          <td>
            <button onClick={() => handleDelete(customer._id)}>Delete</button>
            <EditButton customer={customer} />
          </td>
        </tr>
      ))}
    </>
  );
};


const EditButton = ({ customer }) => {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState();
    const [city, setCity] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    
    
     const handleInpt = (event) => {
    
    const { name, value } = event.target;
    
    if (name === "name") setName(value);
    else if (name === "city") setCity(value);
    else if (name === "phone") setPhone(value);
    else if (name === "email") setEmail(value);
    
  };

  const HandleSave = async (event) => {
    event.preventDefault();

      try {
          
          const id = customer._id;
      const response = await fetch(
        `http://localhost:3000/updateCustomer/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            city,
            phone,
            email,
          }),
        }
      );
         setShowForm(false);

      const data = await response.text();
      alert(data); // Display success message
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
                label="Name"
                name="name"
                onChange={handleInpt}
                defaultValue={customer.name}
              />
              <TextField
                id="outlined-city"
                label="City"
                name="city"
                onChange={handleInpt}
                defaultValue={customer.city}
              />
            </div>
            <div>
              <TextField
                id="outlined-phone"
                label="Phone"
                name="phone"
                onChange={handleInpt}
                defaultValue={customer.phone}
              />
              <TextField
                id="outlined-email"
                label="Email"
                name="email"
                onChange={handleInpt}
                defaultValue={customer.email}
              />
            </div>
            <div>
              <TextField
                id="outlined-id"
                              label="ID"
                              name="studentId"
                defaultValue={customer._id}
                variant="standard"
                disabled
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

export default CustomerTableData;
