// src/pages/auth/Login.jsx
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GraduationCap, LogIn, UserPlus, Shield, User } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Context";

// ===================
// Schemas
// ===================
const studentLoginSchema = z.object({
  rollNo: z.string().toLowerCase().min(1, "Roll number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const studentRegisterSchema = z.object({
  name: z.string().toUpperCase().min(1, "Name is required"),
  rollNo: z.string().toLowerCase().min(1, "Roll number is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const adminRegisterSchema = z.object({
  name: z.string().toUpperCase().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\d{10}$/, "Phone must be 10 digits"),
  clubName: z.string().min(1, "Club name is required"),
  securityKey: z.string().min(1, "Security key is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function Login() {
  const [activeMainTab, setActiveMainTab] = useState("login"); // login | register
  const [activeRole, setActiveRole] = useState("student"); // student | admin

  const { login } = useAuth();
  const navigate = useNavigate();

  const url = "http://localhost:3000/api/";

  // Select schema dynamically
  const schema =
    activeMainTab === "login"
      ? activeRole === "student"
        ? studentLoginSchema
        : adminLoginSchema
      : activeRole === "student"
      ? studentRegisterSchema
      : adminRegisterSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  // Unified API call
  const onSubmit = async (values) => {
    try {
      let endpoint = "";
      let successMsg = "";

      if (activeMainTab === "login") {
        endpoint = activeRole === "student" ? "student/login" : "admin/login";
        successMsg = "Logged in successfully";
      } else {
        endpoint =
          activeRole === "student" ? "student/register" : "admin/register";
        successMsg = "Registered successfully";
      }

      const response = await axios.post(url + endpoint, values);

      if (response.status === 200 || response.status === 201) {
        toast.success(successMsg);

        if (activeMainTab === "login") {
        
          if (activeRole === "student") {
            login(
              response.data.token,
              response.data.student.role,
              null,
              response.data.student.id // stdId
            );
          } else {
            login(
              response.data.token,
              response.data.admin.role,
              response.data.admin.club._id, // clubId
              null
            );
          }
          navigate("/");
        } else {
          // 🔑 after register, switch to login
          setActiveMainTab("login");
          setActiveRole(activeRole === "student" ? "admin" : "student");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Already registered");
      } else {
        toast.error(error.response?.data?.message || "Request failed");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--gradient-hero)] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl">
        {/* Header */}
        <div className="text-center p-8 pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-indigo-600 rounded-full inline-block">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-bold text-2xl text-gray-800">ClubHub</h1>
          <p className="text-sm text-gray-500">
            Your gateway to student organizations
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8 pt-4">
          {/* Login / Register Tabs */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setActiveMainTab("login")}
              className={`w-1/2 p-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                activeMainTab === "login"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <LogIn size={16} /> Login
            </button>
            <button
              type="button"
              onClick={() => setActiveMainTab("register")}
              className={`w-1/2 p-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                activeMainTab === "register"
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-gray-500 hover:bg-gray-200"
              }`}
            >
              <UserPlus size={16} /> Register
            </button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Role Switcher */}
            <div className="flex border border-gray-200 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setActiveRole("student")}
                className={`w-1/2 p-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                  activeRole === "student"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <User size={16} /> Student
              </button>
              <button
                type="button"
                onClick={() => setActiveRole("admin")}
                className={`w-1/2 p-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 ${
                  activeRole === "admin"
                    ? "bg-indigo-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <Shield size={16} /> Admin
              </button>
            </div>

            {/* Input Fields */}
            {activeMainTab === "login" ? (
              <>
                {activeRole === "student" ? (
                  <div>
                    <label className="block text-sm mb-1">Roll Number</label>
                    <input
                      type="text"
                      {...form.register("rollNo")}
                      placeholder="Enter your roll number"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {form.formState.errors.rollNo && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.rollNo.message}
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm mb-1">Email</label>
                    <input
                      type="email"
                      {...form.register("email")}
                      placeholder="Enter your email"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                    {form.formState.errors.email && (
                      <p className="text-red-500 text-sm">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm mb-1">Password</label>
                  <input
                    type="password"
                    {...form.register("password")}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  {form.formState.errors.password && (
                    <p className="text-red-500 text-sm">
                      {form.formState.errors.password.message}
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Register Fields */}
                {activeRole === "student" ? (
                  <>
                    <div>
                      <label className="block text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        {...form.register("name")}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Roll Number</label>
                      <input
                        type="text"
                        {...form.register("rollNo")}
                        placeholder="Enter your roll number"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.rollNo && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.rollNo.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input
                        type="email"
                        {...form.register("email")}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Password</label>
                      <input
                        type="password"
                        {...form.register("password")}
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.password && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        {...form.register("name")}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.name && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input
                        type="email"
                        {...form.register("email")}
                        placeholder="Enter your email"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Phone</label>
                      <input
                        type="text"
                        {...form.register("phone")}
                        placeholder="Enter your phone number"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Password</label>
                      <input
                        type="password"
                        {...form.register("password")}
                        placeholder="Create a password"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.password && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.password.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Club Name</label>
                      <input
                        type="text"
                        {...form.register("clubName")}
                        placeholder="Enter your club name"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.clubName && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.clubName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm mb-1">Security Key</label>
                      <input
                        type="text"
                        {...form.register("securityKey")}
                        placeholder="Enter your security key"
                        className="w-full px-4 py-2 border rounded-lg"
                      />
                      {form.formState.errors.securityKey && (
                        <p className="text-red-500 text-sm">
                          {form.formState.errors.securityKey.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {activeMainTab === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
