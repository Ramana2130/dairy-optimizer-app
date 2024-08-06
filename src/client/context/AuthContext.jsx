// AuthContext.js

import React, { createContext, useState } from 'react';

// Create a context object
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null); 

  const login = (username) => {
    setUsername(username);
    
  };

  const logout = () => {
    setUsername(null);
  };

  const authContextValue = {
    username,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
