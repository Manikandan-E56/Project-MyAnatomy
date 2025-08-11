import React, { useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const StudentContext = React.createContext(null);

const StudentProvider = ({ children }) => {
  const [token, setToken] = React.useState("");
  const [userDetails, setUserDetails] = React.useState(null);

  const fetchUserDetails = () => {
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      axios
        .get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res) => {
          setUserDetails(res.data);
        })
        .catch((err) => {
          console.error("Error fetching user details:", err);
        });
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const contextValue = {
    token,
    setToken,
    userDetails,
    setUserDetails,
  };

  return (
    <StudentContext.Provider value={contextValue}>
      {children}
    </StudentContext.Provider>
  );
};

StudentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentProvider;
