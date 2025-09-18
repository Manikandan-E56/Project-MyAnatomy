import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { StudentContext } from "../../Context/StudentContext"; // adjust path
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  //const { setToken } = useContext(StudentContext);

  const [data, setData] = useState({ email: "", password: "" });

  const changehandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const url = "http://localhost:3000/api/auth/admin/login";

  const loginHandler = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        const token = response.data.token;
        //setToken(token);
        //localStorage.setItem("token", token);
        toast.success("Login successful");
        navigate("/posts");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="lbox">
        mnn
      
    </div>
  );
}
