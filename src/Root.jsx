import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Root() {
  const { categories } = useLoaderData();
  const [authStatus, setAuthStatus] = useState(false);
  const [userId, setUserId] = useState('');
  const [favorites, setFavorites] = useState([])
  const [chatRooms, setChatRooms] = useState([])
  
  const getUserInfo = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      const { userId } = res.data.user;
      setFavorites(res.data.favorites)
      setChatRooms(res.data.rooms)
      setUserId(userId);
      setAuthStatus(true);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <HomeNav props={{ setAuthStatus, setUserId, categories, chatRooms, setChatRooms, authStatus, userId, favorites, chatRooms, setChatRooms, setFavorites }} className="" />

      <main className='flex justify-center'>
        <Outlet
          context={{ categories, authStatus, setAuthStatus, setUserId, favorites, chatRooms, setChatRooms, setFavorites }}
        />
      </main>
    </>
  );
};