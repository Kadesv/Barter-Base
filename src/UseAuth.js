import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { socket } from './socket';

export const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch user info
  const getUserInfo = useCallback(async () => {
    const loadingTimeout = setTimeout(() => setLoading(true), 300); // Show loading only after threshold

    try {
      const res = await axios.post('/api/authCheck');
      if (res.data.success) {
        setFavorites(res.data.favorites);
        setChatRooms(res.data.rooms);
        socket.emit('join_room', res.data.rooms);
        setAuthUser(res.data.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        console.error('Error fetching user info:', error);
      }
      setAuthUser(null);
    } finally {
      clearTimeout(loadingTimeout); // Clear timeout if fetch completes quickly
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authUser === null) {
      getUserInfo();
    }
  }, []);

  return {
    authUser,
    setAuthUser,
    favorites,
    setFavorites,
    chatRooms,
    setChatRooms,
    loading,
  };
};
