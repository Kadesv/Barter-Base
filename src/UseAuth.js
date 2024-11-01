import { useState, useEffect } from 'react';
import axios from 'axios';
import { socket } from './main';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    const threshold = 300; // Threshold time in milliseconds
    const loadingTimeout = setTimeout(() => setShowLoading(true), threshold); // Show loading only after threshold

    const getUserInfo = async () => {
      try {
        const res = await axios.post('/api/authCheck');
        if (res.data.success) {
          setFavorites(res.data.favorites);
          setChatRooms(res.data.rooms);
          socket.emit('join_room', res.data.rooms);
          setAuthUser(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        clearTimeout(loadingTimeout); // Clear timeout if fetch completes quickly
        setLoading(false);
        setShowLoading(false); // Ensure loading spinner is hidden once data is fetched
      }
    };

    getUserInfo();

    return () => {
      socket.disconnect();
      clearTimeout(loadingTimeout);
    };
  }, []);

  return { authUser, setAuthUser, favorites, setFavorites, chatRooms, setChatRooms, loading, showLoading };
};
