import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [admindetails, setAdmin] = useState("");
  const [post, setPost] = useState([]);

  const fetchUserDetails = () => {
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      axios
        .get("http://localhost:3000/api/user", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => setAdmin(res.data))
        .catch((err) =>
          console.error("Error fetching user details:", err)
        );
    }
  };

  const postfetch = () => {
    const storedToken = token || localStorage.getItem("token");

    if (storedToken) {
      axios
        .get("http://localhost:3000/api/auth/post", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => setPost(res.data))
        .catch((err) =>
          console.error("Error fetching post details:", err)
        );
    }
  };

  useEffect(() => {
    fetchUserDetails();
    postfetch();
  }, []);

  const admincontextvalue = {
    token,
    setToken,
    post,
    admindetails,
  };

  return (
    <AdminContext.Provider value={admincontextvalue}>
      {children}
    </AdminContext.Provider>
  );
};

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminProvider;
