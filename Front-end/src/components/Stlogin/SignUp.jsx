import React from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SignUp() {

   

   const navigate = useNavigate();

   const [data, setData] = useState({
    name: "",
    rollNo: "",
    email: "",
    password: "",
    roll:"Student"
   });

   const url= "http://localhost:3000/api/auth/signup";

   const changehandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
   
    const signup=async(event)=>{
    event.preventDefault();

    const response= await axios.post(url, data);

    if(response.status===200){
      toast.success("Sign up successful");
      navigate("/");


    }else{
      toast.error("Sign up failed");
    }
  }

  return (
    <div className="sbox">
      <form onSubmit={signup} >
        <div className="signup-container">
          <h2>Sign Up</h2>

          <div className="items">
            <input type="text" placeholder="Enter Name" value={data.name} name="name" onChange={changehandle} required />
            <input type="text" placeholder="Enter RollNo" value={data.rollNo} name="rollNo" onChange={changehandle} required/>
            <input type="text" placeholder="Enter Email" value={data.email} name="email" onChange={changehandle} />
            <input type="text" placeholder="Enter Password" value={data.password}  name="password" onChange={changehandle}/>

            <button type="submit">Sign up</button>
            <p>
              Already User ? <span onClick={()=>navigate('/login')} >Login</span>
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
