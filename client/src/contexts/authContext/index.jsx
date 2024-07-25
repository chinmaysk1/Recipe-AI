import React, { useContext, useState, useEffect } from "react";
import { auth } from "../../firebase/firebase";
import { GoogleAuthProvider, signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        initializeUser(user);
      } else {
        // Reset state if no user is logged in
        setCurrentUser(null);
        setUserLoggedIn(false);
        setIsEmailUser(false);
        setIsGoogleUser(false);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Function to initialize user state and flags
  async function initializeUser(user) {
    setCurrentUser(user);

    // Check if provider is email/password login
    const isEmail = user.providerData.some(
      (provider) => provider.providerId === "password"
    );
    setIsEmailUser(isEmail);

    // Check if the auth provider is Google
    const isGoogle = user.providerData.some(
      (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    );
    setIsGoogleUser(isGoogle);

    setUserLoggedIn(true);
    setLoading(false);
  }

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out successfully");
      <Navigate to='/login' />
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const value = {
    userLoggedIn,
    isEmailUser,
    isGoogleUser,
    currentUser,
    setCurrentUser,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
