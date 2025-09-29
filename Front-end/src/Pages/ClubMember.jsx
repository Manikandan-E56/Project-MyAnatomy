import React, { useEffect, useState, useCallback } from "react";
import Navbar from "../components/NavBar";
import { useNavigate } from "react-router-dom"; // Import Navigate
import BackButton from "../components/Backbtn";
import { useAuth } from "../context/Context";
import axios from "axios";
import MemberList from "../components/MemberList"; // We will render this component
import { toast } from "react-toastify";
import Messagebtn from "../components/Messagebtn";

export default function ClubMember() {
  const { token, clubId } = useAuth();
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  
  const url="http://localhost:3000"
  
  const fetchMembers = useCallback(async () => {
    if (!clubId || !token) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${url}/api/club/admin/members/${clubId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMembers(response.data.members || []);
    } catch (err) {
      setError("Failed to fetch members.");
      console.error("Error fetching members:", err);
    } finally {
      setIsLoading(false);
    }
  }, [clubId, token]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleRemoveMember = async (StudentId) => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      try {
       
        await axios.delete(`${url}/api/club/admin/${clubId}/remove/${StudentId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Member removed!");
       
        setMembers(members.filter((member) => member._id !== StudentId));
      } catch (error) {
        toast.error("Failed to remove member.");
      }
    }
  };

  if(!token){
    navigate("/");
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar />
      <div className="my-4 mx-8">
        <BackButton />
      </div>
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Club Member Manage
        </h1>
        <MemberList
          members={members}
          isLoading={isLoading}
          error={error}
          
          onRemove={handleRemoveMember}
        />
      </main>
      <Messagebtn/>
    </div>
  );
}
