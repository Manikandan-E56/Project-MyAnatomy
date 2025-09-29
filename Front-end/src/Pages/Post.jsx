import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import Navbar from "../components/NavBar";
import Backbtn from "../components/Backbtn";
import { useAuth } from "../context/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import Messagebtn from "../components/Messagebtn";

export default function Post() {
  const { token, clubId, stdId, role } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
const url="http://localhost:3000"
 
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);


  let endpointUrl;
  if (role === "student") {
    endpointUrl = `${url}/post/student/${stdId}`;
  } else {
    endpointUrl = `${url}/post/club/${clubId}`;
  }

  // ✅ Fetch posts
  useEffect(() => {
    if (!token || (!clubId && !stdId)) return;

    const controller = new AbortController();

    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(endpointUrl, {
          signal: controller.signal,
        });

        setPosts(response.data.posts || []);
      } catch (err) {
        if (axios.isCancel(err)) return;
        const errorMessage = err.response
          ? err.response.data.message
          : err.message;
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    return () => controller.abort();
  }, [token, clubId, stdId, endpointUrl]);

  if (!token) {
    navigate("/login");
  }

  if (isLoading) {
    return <Loading />;  
  }
  
  return (
    <div className="bg-gray-50 w-full min-h-screen font-sans ">
      <Navbar />
      <div className="my-4 mx-8">
               <Backbtn />
      </div>
      <div className="w-full p-8">
     
        {token && (
          <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Recent Posts & Events</h2>

            {/* ✅ Loading & Error states */}
            {isLoading && <p className="text-gray-600">Loading posts...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* ✅ Posts */}
            <div className="flex flex-col gap-6">
              {posts.length === 0 && (
                <p className="text-gray-600 text-center mb-6 font-bold text-xl">
                  Join The Club
                </p>
              )}
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-gray-200 p-6 rounded-lg shadow-sm transition-transform transform hover:scale-[1.02]"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{post.description}</p>
                  <div className="flex items-center justify-end text-gray-600">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {new Date(post.createdAt).toLocaleDateString("en-IN")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Messagebtn/>
    </div>
  );
}
