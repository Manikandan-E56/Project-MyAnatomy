import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import BackButton from "../components/Backbtn";
import { Users, UserPlus } from "lucide-react"; // Icons for the component
import { useAuth } from "../context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function ClubJoin() {
  const { clubId } = useParams();
  const { role, token } = useAuth();
  const [data, setData] = React.useState(null);
  const [isJoining, setIsJoining] = React.useState(false);

  const url = "http://localhost:3000";


  useEffect(() => {
    if (!clubId || !token) {
      return;
    }

    const fetchClubData = async () => {
      try {
        const response = await axios.get(`${url}/api/club/${clubId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data.club);
        
      } catch (error) {
        
      }
    };

    fetchClubData();
  }, [clubId, token]);

  const clubjoin = async () => {
  setIsJoining(true); 

  try {
    const response = await axios.post(`${url}/api/club/${clubId}/join`,
      null,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    toast.success(response.data.message || "Successfully joined the club!");


  } catch (error) {
    const errorMessage = error.response?.data?.message || "An error occurred.";
    toast.error(errorMessage);
  } finally {
    setIsJoining(false); // Re-enable the button
  }
};


  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BackButton />

        <div className="max-w-4xl mx-auto mt-6">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-yellow-500 text-transparent bg-clip-text">
            {data ? data.name : "Loading..."}
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {data ? data.description : "Loading club description..."}
          </p>

          <div className="flex items-center space-x-6 mb-12">
            <div className="text-gray-800 font-semibold">Admin: {data ? data.admin.name : "Loading..."}</div>
            <div className="flex items-center bg-blue-500 text-white text-sm font-medium px-4 py-1.5 rounded-full">
              <Users size={16} className="mr-2" />
              {data ? data.memberCount : 0} Members
            </div>
          </div>

          {/* Join Button */}
          {role === "student" && (
            <div className="text-center">
              <button className="inline-flex items-center justify-center bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105" onClick={clubjoin}>
                <UserPlus size={20} className="mr-2" />
                {isJoining ? 'Joining...' : 'Join Club'}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
