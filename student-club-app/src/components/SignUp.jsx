import React from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

export default function SignUp() {

   // const navigate=useNavigate();

   const navigate = useNavigate();

   
    const signup=async(event)=>{


    }

  return (
    <div className="sbox">
      <form >
        <div className="signup-container">
          <h2>Sign Up</h2>

          <div className="items">
            <input type="text" placeholder="Enter Name" />
            <input type="text" placeholder="Enter RollNo" />
            <input type="text" placeholder="Enter Email" />
            <input type="text" placeholder="Enter Password" />

            <button>Sign up</button>
            <p>
              Already User ? <span onClick={()=>navigate('/')} >Login</span>
            </p>
          </div>
          <hr />
          <button>
            <img src="/google.png" alt="" />
            <a href="">Sign with google</a>
          </button>
        </div>
      </form>
    </div>
  );
}
