import React from 'react';
import PropTypes from "prop-types";

export const StudentContext = React.createContext(null);

const StudentProvider = ({ children }) => {
  const [token, setToken] = React.useState("");

  const contextValue = {
    token,
    setToken
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
