import React, { useState, useEffect, createContext } from "react";
import {jwtDecode} from "jwt-decode"; // Assuming jwt-decode is properly imported

export const AuthorContext = createContext(false);

export default function AuthorProvider({ children }) {
  const [isLoggin, setIsLoggin] = useState(!!localStorage.getItem("token"));
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserData(decoded);
        setIsLoggin(true);
      } catch (error) {
        setIsLoggin(false);
        localStorage.removeItem("token");
      }
    }

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const decoded = jwtDecode(token);
          setUserData(decoded);
          setIsLoggin(true);
        } catch (error) {
          setIsLoggin(false);
          localStorage.removeItem("token");
        }
      } else {
        setIsLoggin(false);
        setUserData(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthorContext.Provider value={{ isLoggin, setIsLoggin, userData }}>
      {children}
    </AuthorContext.Provider>
  );
}
