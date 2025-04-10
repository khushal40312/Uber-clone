import React, { createContext, useEffect, useState } from 'react'

export const UserDataContext = createContext()
const UserContext = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleAuthChange); // Detects changes across tabs

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return (
    <div>
      <UserDataContext.Provider value={{isAuthenticated,setIsAuthenticated}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
