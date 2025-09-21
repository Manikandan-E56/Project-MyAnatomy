import React, { useState, useEffect } from "react";
import { useAuth } from "../context/Context"; // Adjust path to your context
import axios from "axios";
import { toast } from "react-toastify";

import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar";
import Backbtn from "../Components/Backbtn";
import LoadingSpinner from "../Components/Loading";

// A simple Back Button component

export default function Settings() {
  const { role, stdId, token, clubId } = useAuth();
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data based on role when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const url =
        role === "admin"
          ? `http://localhost:3000/api/admin/profile/${clubId}` // Admin fetches club details
          : `http://localhost:3000/api/student/profile/${stdId}`; // Student fetches personal details

      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (role === "admin") {
          setFormData(response.data.admin);
        } else {
          setFormData(response.data.student);
        }
      } catch (error) {
        toast.error("Failed to fetch settings data.");
      } finally {
        setIsLoading(false);
      }
    };

    if (token && (clubId || stdId)) {
      fetchData();
    }
  }, [role, stdId, token, clubId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  if (!token) {
    Navigate("/login");
  }

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-50 w-full min-h-screen  font-sans">
      <Navbar />
      <div className="my-4 mx-8">
        <Backbtn />
      </div>
      <div className=" p-8">
        <h1 className="text-2xl font-bold mb-6 ml-40">Settings</h1>

        {/* ADMIN VIEW */}
        {role === "admin" && (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl border mx-auto">
            <h2 className="text-xl font-semibold mb-4">Club Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label
                  htmlFor="adminName"
                  className="w-32 text-gray-700 font-medium"
                >
                  Admin Name:
                </label>
                <input
                  type="text"
                  id="adminName"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="w-32 text-gray-700 font-medium"
                >
                  Club Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.club.club_name || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="email"
                  className="w-32 text-gray-700 font-medium"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="phone"
                  className="w-32 text-gray-700 font-medium"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
              </div>
              <div className="flex items-start">
                <label
                  htmlFor="description"
                  className="w-32 text-gray-700 font-medium pt-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  rows="4"
                  value={formData.club.description || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2 resize-y"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* STUDENT VIEW */}
        {role === "student" && (
          <div className="bg-white p-6 rounded-lg shadow-md border max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <label
                  htmlFor="name"
                  className="w-32 text-gray-700 font-medium"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="rollNo"
                  className="w-32 text-gray-700 font-medium"
                >
                  Roll No:
                </label>
                <input
                  type="text"
                  id="rollNo"
                  value={formData.rollNo || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              <div className="flex items-center">
                <label
                  htmlFor="email"
                  className="w-32 text-gray-700 font-medium"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                  disabled
                />
              </div>
              {/* <div className="flex items-center">
                <label
                  htmlFor="phone"
                  className="w-32 text-gray-700 font-medium"
                >
                  Phone:
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  className="flex-1 border border-gray-300 rounded-md p-2"
                />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
