// src/context/Context.jsx
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [clubId, setClubId] = useState(localStorage.getItem("clubId"));
  const [stdId, setStdId] = useState(localStorage.getItem("stdId"));

  const [user, setUser] = useState(() => {
    const savedToken = localStorage.getItem("token");
    try {
      return savedToken ? jwtDecode(savedToken) : null;
    } catch {
      return null;
    }
  });

  const login = (newToken, role, clubIdValue = null, stdIdValue = null) => {
    try {
      const decodedUser = jwtDecode(newToken);

      localStorage.setItem("token", newToken);
      localStorage.setItem("role", role);

      if (clubIdValue) {
        localStorage.setItem("clubId", clubIdValue);
        setClubId(clubIdValue);
      }
      if (stdIdValue) {
        localStorage.setItem("stdId", stdIdValue);
        setStdId(stdIdValue);
      }

      setToken(newToken);
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode token on login:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("clubId");
    localStorage.removeItem("stdId");
    setToken(null);
    setUser(null);
    setClubId(null);
    setStdId(null);
  };

  const role = localStorage.getItem("role");

  const value = {
    token,
    user,
    role,
    login,
    logout,
    clubId,
    stdId,
    setClubId,
    setStdId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
