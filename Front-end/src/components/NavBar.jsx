import React, { useState } from "react";
import { useAuth } from "../context/Context";
import { useNavigate, NavLink } from "react-router-dom";
import { LogOut, Plus, Menu, X } from "lucide-react";

export default function Navbar() {
  const { token, logout, role } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const navLinkClasses ="hover:text-white hover:bg-blue-500 px-2 rounded transition-colors text-gray-200";

  const button ="bg-white text-black font-bold py-2 px-6 rounded-md hover:bg-gray-200 transition duration-200 flex items-center gap-2";

  return (
    <div className="w-full h-20 bg-[#4664AE] flex items-center rounded-b-lg justify-between px-4 md:px-12 sticky top-0 z-50 bg-white shadow-md text-white relative">
      {/* Left section */}
      <div className="mb-2 md:mb-0 text-center md:text-left">
        <h1 className="font-bold text-2xl md:text-3xl">ClubHub</h1>
        <p className="text-sm md:text-base">
          Discover and join student organizations
        </p>
      </div>

      {/* Desktop nav (always visible on md and up) */}
      {token && (
        <nav className=" md:flex items-center gap-6 text-base md:text-lg">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/post" className={navLinkClasses}>
            Posts
          </NavLink>
          {role === "student" && (
            <NavLink to="/myclubs" className={navLinkClasses}>
              Clubs
            </NavLink>
          )}
          {role === "admin" && (
            <NavLink to="/clubmember/:clubId" className={navLinkClasses}>
              Club Members
            </NavLink>
          )}
          <NavLink to="/settings" className={navLinkClasses}>
            Settings
          </NavLink>
        </nav>
      )}

      {/* Right side buttons (desktop only) */}
      <div className=" md:flex gap-2">
        {token ? (
          <>
            {role === "admin" && (
              <button className="bg-white text-blue-700 font-semibold cursor-pointer flex items-center gap-2 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors" onClick={() => navigate("/postcreate")}>
                <Plus size={16} />
                <span>Create Post</span>
              </button>
            )}
            <button className="bg-red-500 text-white font-semibold flex items-center cursor-pointer gap-2 px-4 py-2 rounded-md hover:bg-red-600 transition-colors" onClick={logout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <button className={button} onClick={() => navigate("/login")}>
            <span>Sign In</span>
          </button>
        )}
      </div>

      {/* Mobile menu toggle (only visible on small screens) */}
      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="absolute top-20 right-4 w-48 bg-white text-black rounded-md shadow-lg p-4 flex flex-col gap-2 z-50 md:hidden">
          {token ? (
            <>
              <NavLink
                to="/dashboard"
                className="hover:bg-gray-200 px-2 py-1 rounded"
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/posts"
                className="hover:bg-gray-200 px-2 py-1 rounded"
                onClick={() => setIsOpen(false)}
              >
                Posts
              </NavLink>
              {role === "student" && (
                <NavLink
                  to="/clubs"
                  className="hover:bg-gray-200 px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Clubs
                </NavLink>
              )}
              {role === "admin" && (
                <NavLink
                  to="/club-members"
                  className="hover:bg-gray-200 px-2 py-1 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Club Members
                </NavLink>
              )}
              <NavLink
                to="/settings"
                className="hover:bg-gray-200 px-2 py-1 rounded"
                onClick={() => setIsOpen(false)}
              >
                Settings
              </NavLink>

              {/* Mobile Buttons */}
              {role === "admin" && (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center gap-2"
                  onClick={() => {
                    navigate("/createpost");
                    setIsOpen(false);
                  }}
                >
                  <Plus size={16} /> Create Post
                </button>
              )}
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md flex items-center gap-2"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
              onClick={() => {
                navigate("/login");
                setIsOpen(false);
              }}
            >
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
