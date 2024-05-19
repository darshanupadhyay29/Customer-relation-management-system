import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleInput = (event) => {
    
    const { name, value } = event.target;
    
    if (name === "name") setName(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
     
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return; // Stop further execution
      } 
      try {
         
      const response = await axios.post('http://127.0.0.1:3000', {
        name,
        email,
        password
      });
          if (response.data.message === "User already exists") {
              alert(response.data.message);
          } else {
              const { token } = response.data;
              localStorage.setItem("token", token);
              navigate("/home");
          }
      } catch (error) {
          
          console.error('Error:', error);
          alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="lbl">
          <label>
            
            <input
              type="text"
              className="inpt"
                          name="name"
                          id='naam'
              placeholder="Name"
              onChange={handleInput}
            ></input>
          </label>
          <br />
          <label>
            
            <input
              type="email"
              name="email"
              className="inpt"
              placeholder="example@gmail.com"
              onChange={handleInput}
            ></input>
          </label>
          <br />
          <label>
            
            <input
              type="password"
              name="password"                          
              className="inpt1"
              placeholder="Password"
              onChange={handleInput}
            ></input>
          </label>
          <br></br>
          <input
            type="button"
            value="Sign Up"
            className="btn"
            onClick={handleSubmit}
          ></input>
          <p>
            <b>Already have an account?</b>
            <a href="http://localhost:3000/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
