import React, { useState } from "react";
import { useAuth } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Navbar from "./NavBar";

export default function PostCreate() {
  const url = "https://project-myanatomy.onrender.com";
  const navigate = useNavigate();
  const { token, role } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const post = async (e) => {
    e.preventDefault();

    if (!data.title || !data.description) {
      return toast.error("Title and Description cannot be empty.");
    }

    setIsLoading(true);

    try {
      await axios.post(url + "/api/post/create", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      toast.success("Post submitted successfully!");
      resetFormAndCloseModal();
    } catch (error) {
      console.error("Failed to submit post:", error);
      toast.error("Failed to submit post. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetFormAndCloseModal = () => {
    setData({ title: "", description: "" });
    navigate(-1);
  };

  if (!token || role !== "admin") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-100">
      <Navbar />
      {/* Center the form */}
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-lg transform-gpu animate-slide-up rounded-lg bg-white p-8 shadow-2xl transition-all">
          <form onSubmit={post}>
            <h2 className="mb-6 border-b pb-3 text-2xl font-bold text-gray-800 text-center">
              Create a New Post
            </h2>

            <div className="flex flex-col gap-5">
              {/* Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-lg font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Title"
                  value={data.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-1 block text-lg font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="5"
                  className="w-full px-3 py-2 rounded border shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={data.description}
                  onChange={handleChange}
                  placeholder="Provide details about the event, deadlines, etc."
                  required
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-end gap-4">
              <button
                type="button"
                className="rounded-md bg-gray-200 px-6 py-2 font-semibold text-gray-800 transition-colors hover:bg-gray-300"
                onClick={resetFormAndCloseModal}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-[#4664AE] px-6 py-2 font-semibold text-white transition-colors hover:bg-[#3a5a94] disabled:cursor-not-allowed disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
