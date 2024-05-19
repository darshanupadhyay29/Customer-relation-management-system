import axios from 'axios';
import React, { useState } from 'react';



const CustomerFormWithToast=()=>{
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleInpt = (event) => {
    
    const { name, value } = event.target;
    
    if (name === "name") setName(value);
    else if (name === "city") setCity(value);
    else if (name === "phone") setPhone(value);
    else if (name === "email") setEmail(value);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
   
  if (!name || !email || !phone || !city) {
    alert("Please fill all the fields");
    return; // Stop further execution
    } 
    try {
       const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://127.0.0.1:3000/newcustomer",
      {
        name,
        city,
        phone,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token here
        },
      }
    );


  

   alert("New client added!Refresh the page to see updated data");

    setName("");
    setCity("");
    setPhone("");
    setEmail("");


   ;
       
    } catch (error) {
        
    console.error('Error:', error);
  }
};




    const handleCancel = () => {
        setShowForm(false); // Set showForm state to false to hide the form
    };

    return(
        <>
        
        <input type="button" className="but" onClick={() =>setShowForm(true)} value='Add client'/>
        {showForm && (
    <div className="newCustomerForm">


        
        <label>
            Name
            <input type='text' value={name} placeholder='Customer Name' name='name' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            City
            <input type='text' value={city} name='city' placeholder='City' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            Phone
            <input type='text' value={phone} name='phone' placeholder='Phone' onChange={handleInpt}></input>
        </label>
        <br/>
        <br/>
        <br/>
        <br/>
        <label>
            E-mail
            <input type='text' value={email} name='email' placeholder='E-mail' onChange={handleInpt}></input>
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


export default CustomerFormWithToast;
