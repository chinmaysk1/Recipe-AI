import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import Sidebar from "./Sidebar";
import { HomeMain } from "./HomeMain";
import './home.css';

export default function Home() {
    return (
        <div className="home">
            <Sidebar />
            <HomeMain />
        </div>
    )
}