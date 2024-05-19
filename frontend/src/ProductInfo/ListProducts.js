import axios from 'axios';
import React, { useState } from 'react';

const ListProducts = () => {
  
    const [showForm, setShowForm] = useState(false);
  const [productName, setproductName] = useState("");
  const [quantity, setquantity] = useState("");
  const [price, setprice] = useState("");
  const [MRP, setMRP] = useState("");

  const handleInpt = (event) => {
    
    const { name, value } = event.target;
    
    if (name === "productName") setproductName(value);
    else if (name === "quantity") setquantity(value);
    else if (name === "price") setprice(value);
    else if (name === "MRP") setMRP(value);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
  if (!productName || !quantity || !price || !MRP) {
    alert("Please fill all the fields");
    return; // Stop further execution
    } 
    try {
        const token = localStorage.getItem("token");
        
        const response = await axios.post(
          "http://127.0.0.1:3000/newproduct",
          {
            productName,
            quantity,
            price,
            MRP,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token here
            },
          }
        );

  

   alert("New product added!Refresh the page to see updated data");

    setproductName("");
    setquantity("");
    setprice("");
    setMRP("");
       
    } catch (error) {
        
    console.error('Error:', error);
  }
};




    const handleCancel = () => {
        setShowForm(false); // Set showForm state to false to hide the form
    };

    return(
        <>
        
        <input type="button" className="but" onClick={() =>setShowForm(true)} value='Add Product'/>
        {showForm && (
    <div className="newCustomerForm">


        
        <label>
            Product Name
            <input type='text' value={productName} placeholder='Enter Product Name' name='productName' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            Quantity
            <input type='text' value={quantity} name='quantity' placeholder='Enter Quantity' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            Price
            <input type='text' value={price} name='price' placeholder='Enter Price' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            MRP
            <input type='text' value={MRP} name='MRP' placeholder='Enter MRP' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <input type='button' className='sbmtbtn' value='Submit' onClick={handleSubmit}/>
        <input type='button' className='cancelbtn' value='Cancel' onClick={handleCancel}/>
        
    </div>
        )}
    </> 
)}

export default ListProducts;