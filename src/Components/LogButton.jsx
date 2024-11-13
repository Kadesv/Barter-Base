import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LogButton({ authUser, setAuthUser, setChatRooms, setFavorites }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post('/api/logout');
      if (res.data.success) {
        setFavorites([]);
        setChatRooms([]);
        setAuthUser(null);
        navigate('/');
      }
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false); // Ensures loading state is reset
    }
  };

  return (
    !authUser ? (
      <a className="underline-animation text-sm transition-all duration-150 bg-transparent hover:text-base" href="/signIn">
        Login
      </a>
    ) : (
      <>
        <button
          className={`${isLoading ? 'underline-animation' : ''} text-sm transition-all duration-150 bg-transparent hover:text-base flex items-center`}
          onClick={handleLogout}
          disabled={isLoading} // Disable button during loading
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs mr-2"></span>
          ) : (
            "Logout"
          )}
        </button>
        <a className="underline-animation text-sm transition-all duration-150 bg-transparent hover:text-base" href="/account">
          Account
        </a>
      </>
    )
  );
}
