import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// Component name updated to PascalCase convention
export default function BackButton() {

  const navigate = useNavigate();

  return (
      <button
        onClick={() => navigate(-1)} // Navigates to the previous page
        className="flex items-center gap-2 px-8 py-1 mb-6 cursor-pointer font-semibold text-white bg-[#4664AE] rounded-2xl shadow-md hover:bg-blue-600 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </button>
    );
}