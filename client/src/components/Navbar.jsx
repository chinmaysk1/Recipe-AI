import { NavLink } from "react-router-dom";
import image from '../assets/images/logo.png';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await doSignOut();
      navigate("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Logo" className="h-10 inline" src={image} style={{marginTop: 20, marginLeft: 20, width: 50, height: 'auto'}}></img>
        </NavLink>

        <NavLink className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3" style={{marginRight: 50, marginTop: 20}}>
        <button onClick={handleSignOut} disabled={isLoggingOut}>
          {isLoggingOut ? "Logging out..." : "Logout"}
        </button>
        </NavLink>
      </nav>
    </div>
  );
}