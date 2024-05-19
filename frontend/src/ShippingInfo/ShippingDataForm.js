import axios from 'axios';
import React, { useState } from 'react';

//Address	City	Pincode	Purchase order Id	Customer Id
const ShippingDataForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [address, setaddress] = useState("");
    const [city, setcity] = useState("");
    const [pincode, setpincode] = useState("");
    const [customerId, setcustomerId] = useState("");
    const [productId, setproductId] = useState("");
    
  
    const handleInpt = (event) => {
      
      const { name, value } = event.target;
      
      if (name === "address") setaddress(value);
      else if (name === "city") setcity(value);
      else if (name === "pincode") setpincode(value);      
      else if (name === "customerId") setcustomerId(value);
      else if (name === "productId") setproductId(value);      
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
     
    if (!address || !city || !pincode||!customerId||!productId) {
      alert("Please fill all the fields");
      return; // Stop further execution
      } 
      try {
         const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:3000/newshippingorder",
        {
          address,
          city,
          pincode,
          customerId,
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token here
          },
        }
      );
          
     alert("New shipping data added!Refresh the page to see updated data");
  
     setaddress("");
     setcity("");
     setpincode(""); 
     setcustomerId("");
     setproductId("");
         
         
      } catch (error) {
          
      console.error('Error:', error);
    }
  };
  
  
  
  
      const handleCancel = () => {
          setShowForm(false); // Set showForm state to false to hide the form
      };
  
      return (
        <>
          <input
            type="button"
            className="but"
            onClick={() => setShowForm(true)}
            value="Add data"
          />
          {showForm && (
            <div className="newCustomerForm">
              <label>
                Address
                <input
                  type="text"
                  value={address}
                  placeholder="Enter address"
                  name="address"
                  onChange={handleInpt}
                ></input>
              </label>
              <br />
              <br />
              <br />
              <br />
              <label>
                City
                <input
                  type="text"
                  value={city}
                  name="city"
                  placeholder="Enter City"
                  onChange={handleInpt}
                ></input>
              </label>
              <br />
              <br />
              <br />
              <br />
              <label>
                Pin-code
                <input
                  type="text"
                  value={pincode}
                  name="pincode"
                  placeholder="Enter pin code"
                  onChange={handleInpt}
                ></input>
              </label>
              <br />
              <br />
              <br />
              <br />
              <label>
                Customer-Id
                <input
                  type="text"
                  value={customerId}
                  name="customerId"
                  placeholder="Enter Customer-Id"
                  onChange={handleInpt}
                ></input>
              </label>
              <br />
              <br />
              <br />
              <br />
              <label>
                Product-id
                <input
                  type="text"
                  value={productId}
                  name="productId"
                  placeholder="Enter Product-Id"
                  onChange={handleInpt}
                ></input>
                      </label>
                      <br/>
                      <br/>
                      <br/>
                      <br/>
              <input
                type="button"
                className="sbmtbtn"
                value="Submit"
                onClick={handleSubmit}
              />
              <input
                type="button"
                className="cancelbtn"
                value="Cancel"
                onClick={handleCancel}
              />
            </div>
          )}
        </>
      );}
  
export default ShippingDataForm;