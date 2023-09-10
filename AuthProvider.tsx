// AuthContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

// Custom hook to use the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap your app and provide authentication context
export const AuthProvider = ({ children }) => {
  // State to manage authentication status and user data
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a user loading process (you can replace this with your actual authentication logic)
  useEffect(() => {
    // Simulate a delay to mimic user loading
    const timer = setTimeout(() => {
      // Assuming the user is authenticated, set the user data
      setUser({
        id: '123',
        username: 'exampleuser',
        // Add more user data as needed
      });
      setIsLoading(false);
    }, 2000);

    // Clear the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  // Function to sign the user out
  const signOut = async () => {
    // You can implement sign-out logic here
    // For example, clear user data, remove tokens, etc.
    setUser(null);
  };

  // Value to provide to the context consumers
  const value = {
    user,
    isLoading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
