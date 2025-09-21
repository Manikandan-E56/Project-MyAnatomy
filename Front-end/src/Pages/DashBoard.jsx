import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import { useAuth } from "../context/Context";

import CountUp from "react-countup";
import { CiSearch } from "react-icons/ci";

import ImageSlider from "../components/ImageSlider";
import ClubCard from "../components/ClubCard";


const ApprovalRequest = ({ name, id }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b last:border-b-0">
      <div>
        <p className="font-semibold text-gray-800">{name}</p>
        <p className="text-sm text-gray-500">{id}</p>
      </div>
      <div className="flex gap-2">
        <button className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md hover:bg-green-200">
          Approve
        </button>
        <button className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-md hover:bg-red-200">
          Reject
        </button>
      </div>
    </div>
  );
};

const stats = {
  studentCount: 45,
  postCount: 45,
};

const pendingStudents = [];

export default function Dashboard() {
  const url = "https://project-myanatomy.onrender.com";
  const { token, role, stdId, clubId } = useAuth();
  const [search, setSearch] = useState("");
  const [clubs, setClubs] = useState([]);
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState([])
  const [count,setCount]=useState(0);


  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`${url}/api/club`);
        const data = await response.json();
        if (data && Array.isArray(data.clubs)) {
          setClubs(data.clubs);
        } else {
          setClubs([]);
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
        setClubs([]);
      }
    };
    fetchClubs();
  }, [token]);

  let endpoint = "";

  if (role === "admin") {
    endpoint = `${url}/api/admin/dashboard/${clubId}`;
  } else if (role === "student") {
    endpoint = `${url}/api/student/dashboard/${stdId}`;
  }

  const dashboard = async () => {
    if (!endpoint) return; // safeguard
    try {
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (role === "admin") {
        setAdmin(data.club);
        setCount(data.club.members.length);
        
      } else if (role === "student") {
        setName(data.student.name);
      }

    } catch (error) {
      console.error("Error fetching dashboard:", error);
    }
  };

  useEffect(() => {
    if (token && (role === "admin" ? clubId : stdId)) {
      dashboard();
    }
  }, [token, role, clubId, stdId]);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      {/* ✅ ADMIN DASHBOARD */}
      {token && role === "admin" && (
        <div className="w-full bg-gray-50 p-4 sm:p-8 ">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Admin Dashboard
              </h1>
              <p className="text-base sm:text-lg text-gray-500">
                Manage posts for Computer Science Society
              </p>
            </div>
            <div>
              <h1 className="text-4xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text text-center">
                {admin.name}
              </h1>
            </div>
          </div>

          {/* Stats */}
          <div className="flex  sm:flex-row gap-10 mt-6">
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-700">
                <CountUp end={count} duration={2} />
              </p>
              <p className="text-sm sm:text-lg text-gray-500 mt-2">
                Student Count
              </p>
            </div>
            <div className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-gray-700">
                <CountUp end={stats.postCount} />
              </p>
              <p className="text-sm sm:text-lg text-gray-500 mt-2">
                Post Count
              </p>
            </div>
          </div>

          {/* Approval + Slider */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Pending Approvals */}
            <div className="bg-white p-4 border border-gray-300 rounded-2xl shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Pending Approvals</h2>
              <div className="max-h-[400px] overflow-y-auto">
                {pendingStudents.map((student) => (
                  <ApprovalRequest
                    key={student.id}
                    name={student.name}
                    id={student.id}
                  />
                ))}
              </div>
            </div>

            {/* Image Slider */}
            <div className="lg:col-span-2 flex items-center justify-center bg-white p-4 rounded-2xl shadow-lg">
              <ImageSlider />
            </div>
          </div>
        </div>
      )}

      {/* ✅ STUDENT DASHBOARD */}
      {token && role === "student" && (
        <div className="w-full bg-gray-50 flex flex-col md:flex-row gap-8 items-center justify-between py-8 px-4 sm:px-8 mt-10">
          <div className="w-full md:w-1/2">
            <ImageSlider />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome {name}!
            </h1>
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 to-yellow-400 text-transparent bg-clip-text mb-4">
              Club Hub
            </h1>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              A vibrant community for computer science students to learn, share
              knowledge, and work on exciting projects together. We organize
              coding competitions, workshops, tech talks, and networking events
              with industry professionals. Whether you're a beginner or an
              experienced programmer, there's something here for everyone!
            </p>
          </div>
        </div>
      )}

      {/* ✅ CLUBS SECTION */}
      {(!token || role === "student") && (
        <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch />
              </div>
              <input
                type="text"
                placeholder="Search Club name...."
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="block w-full pl-10 pr-3 py-2 sm:py-3 border border-gray-300 rounded-lg 
                     leading-5 bg-white placeholder-gray-500 
                     focus:outline-none focus:placeholder-gray-400 
                     focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          {/* Clubs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
