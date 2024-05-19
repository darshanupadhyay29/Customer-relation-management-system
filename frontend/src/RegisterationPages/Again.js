import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

const Login = () => {
    
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
  const handleInput = (event) => {
    
    const { name, value } = event.target;
    
     if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
    
  };


    const SubmitHandler = async (event) => {
        event.preventDefault();
      
        if (!email || !password) {
            alert("Please fill all the fields");
            return; // Stop further execution
        }
        try {
         
            const response = await axios.post(
                "/login",
                {
                    email,
                    password,
                }
            )
             const { token } = response.data;
         localStorage.setItem("token", token);
         navigate("/home");
    } catch (error) {
        alert("Wrong username or password!")
      console.error('Error:', error);
    }
  };

  return (
    <div>
      {" "}
      <div class="container">
        <div class="lbl">
          <label>
         
            <input
              type="email"
              placeholder="example@gmail.com"
              className="inpt"
              name="email"
              onChange={handleInput}
            ></input>
          </label>
          <br />
          <label>
            
            <input
              type="password"
              placeholder="Password"
              className="inpt1"
              name="password"
              onChange={handleInput}
            ></input>
          </label>
          <br></br>
          <input
            type="button"
            value="Login"
            class="btn"
            onClick={SubmitHandler}
          ></input>

          <p>Or</p>
          <a href="http://localhost:3000">
            <b>-Create new account-</b>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;