import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { doSignOut } from "../firebase/auth";

export default function Home() {
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
    <button onClick={handleSignOut} disabled={isLoggingOut}>
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}