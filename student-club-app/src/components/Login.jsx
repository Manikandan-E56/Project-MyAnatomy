import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    rollNo: "",
    password: "",
  });

  const changehandle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const url = "http://localhost:3000/api/auth/login";

  const loginHandler = async (e) => {
    e.preventDefault();

    const { rollNo, password } = data;

    if (!rollNo || !password) {
      toast.error("Please fill all fields");
      return;
    }
    console.log("Login data:", data);
    try {
      const response = await axios.post(url, data);

      if (response.status === 200) {
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        toast.error("Login failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="lbox">
      <form onSubmit={loginHandler}>
        <div className="login-container">
          <h2>Login</h2>
          <div className="items">
            <input
              type="text"
              placeholder="Enter RollNo"
              name="rollNo"
              value={data.rollNo}
              onChange={changehandle}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={changehandle}
            />
            <button type="submit">Login</button>
            <p>
              Not a User?{" "}
              <span onClick={() => navigate("/signup")}>Register</span>
            </p>
          </div>

          <hr />
          <button type="button" onClick={() => toast.info("Google Sign-In coming soon!")}>
            <img src="/google.png" alt="" />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
}
