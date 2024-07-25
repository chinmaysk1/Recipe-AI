import { Outlet, BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useEffect, useState, useContext } from "react";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/home';

  return (
    <div className="w-full">
      {showNavbar && <Navbar />}
      <Outlet />
    </div>
  );
};
export default App;