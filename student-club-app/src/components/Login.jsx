import React from "react";

import "./Login.css"; // Assuming you have a CSS file for styling
import {useNavigate} from "react-router-dom";
export default function Login() {

  const navigate = useNavigate();

  
  

  return (
    <>
      <div className="lbox">
      <form >
        <div className="login-container" >
          <h2>Login</h2>
          <div className="items">
            <input type="text" placeholder="Enter RollNo" />
            <input type="text" placeholder="Password" />

            <button type="submit">Login</button>
            <p>
              Not a User ? <span onClick={()=>navigate('/signup')}>Register</span>
            </p>
          </div>

          <hr />
          <button type="submit">
            <img src="/google.png" alt="" />
            <a href="">Sign with google</a>
          </button>
        </div>

        
          
        </form>
      </div>
    </>
  );
}
