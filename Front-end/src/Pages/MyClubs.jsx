import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom"; // Import Navigate
import Navbar from "../components/NavBar";
import BackButton from "../components/Backbtn";
import { useAuth } from "../context/Context";
import axios from "axios";
import Loading from "../components/Loading";
import Messagebtn from "../components/Messagebtn";





export default function MyClubs() {
  const { token, role, stdId } = useAuth();
  const [myClubsData, setMyClubsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  
const url="https://project-myanatomy.onrender.com"

  const fetchClubs = async () => {
    setIsLoading(true); 
    try {
      const response = await axios.get(`${url}/api/student/myclubs/${stdId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      setMyClubsData(response.data.clubs || []);
    } catch (error) {
      console.error("Error fetching clubs:", error);
      setMyClubsData([]); 
    } finally {
      setIsLoading(false); 
    }
  };

  useEffect(() => {
   
    if (token && stdId) {
      fetchClubs();
    }
  }, [token, stdId]);

 
  if (!token || role !== "student") {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="my-4 mx-8">
        <BackButton />
      </div>

      <main className="container mx-auto p-8 pt-0">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Clubs</h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {isLoading ? (
            <Loading/>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-4 text-sm font-semibold text-gray-700">S.no</th>
                  <th className="p-4 text-sm font-semibold text-gray-700">Club Name</th>
                  <th className="p-4 text-sm font-semibold text-gray-700">Admin</th>
                  <th className="p-4 text-sm font-semibold text-gray-700">Email</th>
                </tr>
              </thead>
              <tbody>
                {myClubsData.length > 0 ? (
                  myClubsData.map((club, index) => (
                    <tr key={club._id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer ">
                      <td className="p-4 text-gray-700">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="p-4 text-gray-700 font-medium">{club.name}</td>
                     
                      <td className="p-4 text-gray-700">{club.admin?.name}</td>
                      <td className="p-4 text-gray-700">{club.admin?.email}</td>
                      
                    </tr>
                    
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-gray-500">
                      You haven't joined any clubs yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </main>
      <Messagebtn/>
    </div>
  );
}