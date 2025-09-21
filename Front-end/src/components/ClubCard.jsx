import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { MdGroupAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function ClubCard({ club }) {
  const Navigate = useNavigate();

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-800">{club.name}</h3>
        <div className="flex items-center bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-2 rounded-full">
          <FaUserGroup />
          {club.memberCount}
        </div>
      </div>
      <p className="text-gray-600 mb-6">{club.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-gray-500">
          <MdGroupAdd />

          <span className="text-sm">
            Admin: {club.admin ? club.admin.name : "No admin assigned"}
          </span>
        </div>
        <button className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200" onClick={()=>Navigate('/club/'+club._id)}>
          View Details
        </button>
      </div>
    </div>
  );
}
