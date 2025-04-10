import React, { createContext, useEffect, useState } from 'react'

export const CaptainDataContext = createContext()
const CaptainContext = ({ children }) => {
  const [isCaptainAuthenticated, setIsCaptainAuthenticated] = useState(!!localStorage.getItem("cap-token"));

  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(!!localStorage.getItem("cap-token"));
    };

    window.addEventListener("storage", handleAuthChange); // Detects changes across tabs

    return () => {
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  return (
    <div>
      <CaptainDataContext.Provider value={{isCaptainAuthenticated,setIsCaptainAuthenticated}}>
        {children}
      </CaptainDataContext.Provider>
    </div>
  )
}

export default CaptainContext
