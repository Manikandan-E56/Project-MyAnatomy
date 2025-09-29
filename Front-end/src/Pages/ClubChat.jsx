import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/NavBar";
import Backbtn from '../components/Backbtn';
import { useAuth } from '../context/Context'; 
import { SendHorizontal } from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';

export default function ClubChatComponent() {
  const { role, stdId, token, clubId: contextClubId } = useAuth();
  const [selectedClub, setSelectedClub] = useState(null);
  const [myClubsData, setMyClubsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  const url = "https://project-myanatomy.onrender.com";

  // --- 1. Socket.IO connection ---
  useEffect(() => {
    const newSocket = io(url);
    setSocket(newSocket);
    return () => newSocket.disconnect();
  }, []);

  if(!token) {
    window.location.href = "/";
  }

  // --- 2. Join club room & listen for messages ---
  useEffect(() => {
    if (!socket || !selectedClub) return;

    socket.emit('joinClub', selectedClub.conversationId);

    const handleReceiveMessage = (incomingMessage) => {
      setMessages(prev => [...prev, incomingMessage]);
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.emit('leaveClub', selectedClub.conversationId);
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [socket, selectedClub]);

  // --- 3. Fetch clubs or admin's group ---
  useEffect(() => {
    const fetchClubs = async () => {
      setIsLoading(true);
      try {
        if (role === "student") {
          const res = await axios.get(`${url}/api/student/myclubs/${stdId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const clubs = res.data.clubs || [];
          setMyClubsData(clubs);
          if (clubs.length > 0 && !selectedClub) setSelectedClub(clubs[0]);
        } else if (role === "admin") {
          const res = await axios.get(`${url}/api/message/admin/myclub/${contextClubId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setSelectedClub(res.data.club);
        }
      } catch (err) {
        console.error("Error fetching clubs:", err);
        setMyClubsData([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) fetchClubs();
  }, [token, stdId, role, contextClubId]);

  // --- 4. Fetch messages for selected club ---
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedClub) return;
      try {
        const res = await axios.get(`${url}/api/message/${selectedClub._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };
    fetchMessages();
  }, [selectedClub]);

  // --- 5. Auto-scroll ---
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- 6. Send message ---
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClub) return;

    const messageData = {
      sender: role === 'admin' ? contextClubId : stdId,
      content: newMessage,
      senderModel: role === 'admin' ? 'Admin' : 'Student'
    };

    // Optimistic UI
    setMessages(prev => [
      ...prev,
      {
        _id: Date.now(),
        content: newMessage,
        sender: { _id: messageData.sender, name: role === 'admin' ? "Admin" : "You" },
        createdAt: new Date().toISOString()
      }
    ]);
    setNewMessage('');

    try {
      const res = await axios.post(`${url}/api/message/${selectedClub._id}`, messageData);
      socket?.emit('sendMessage', res.data); // emit real saved message
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar/>
      <div className="flex-grow flex p-4 sm:p-6 lg:p-8 space-x-6">

        {/* Sidebar for students only */}
        {role === 'student' && (
          <aside className="w-1/4 lg:w-1/5 bg-white rounded-lg shadow-md p-4 flex-shrink-0 h-full">
            <Backbtn/>
            <nav>
              <ul>
                {isLoading ? (
                  <p>Loading clubs...</p>
                ) : myClubsData.map(club => (
                  <li
                    key={club._id}
                    className={`p-3 rounded-lg cursor-pointer border-b border-gray-200 transition ${
                      selectedClub?._id === club._id ? 'bg-blue-100 text-blue-800 font-semibold' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedClub(club)}
                  >
                    {club.name}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}

        {/* Chat area */}
        <main
          className="w-full lg:w-4/5 bg-white rounded-lg shadow-md relative overflow-hidden flex flex-col"
          style={{ backgroundImage: `url('/Chatbg.png')` }}
        >
          <div className="absolute inset-0 bg-white opacity-80"></div>
          <div className="relative z-10 h-full flex flex-col p-6">
            {selectedClub ? (
              <>
                <div className="flex-shrink-0">
                  <h2 className="text-2xl font-bold text-gray-700">Chat - {selectedClub.name}</h2>
                </div>

                {/* Messages container (scrollable) */}
                <div className="flex-grow my-4  ">
                  <div className="h-full overflow-x-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex items-end gap-2 ${
                          msg.sender?._id === (role === 'admin' ? contextClubId : stdId) ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-md p-3 rounded-2xl ${
                            msg.sender?._id === (role === 'admin' ? contextClubId : stdId)
                              ? 'bg-blue-500 text-white rounded-br-none'
                              : 'bg-gray-200 text-gray-800 rounded-bl-none'
                          }`}
                        >
                          <p className="font-bold text-xs mb-1">{msg.sender?.name ?? "Admin"}</p>
                          <p className="text-sm">{msg.content}</p>
                        </div>
                        <p className="text-xs">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Sticky input */}
                <form onSubmit={handleSendMessage} className="mt-auto bg-gray-100 rounded-xl p-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1 w-full bg-transparent p-2 text-gray-800 placeholder-gray-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center h-10 w-10 rounded-full text-white bg-[#4664AE] hover:bg-blue-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      <SendHorizontal />
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="text-center m-auto">
                <h2 className="text-2xl font-bold text-gray-700">Welcome to ClubHub Chat</h2>
                <p className="text-gray-500 mt-2">Select a club from the left to start chatting.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
