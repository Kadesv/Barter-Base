import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Root() {
  const { categories } = useLoaderData();
  const [authStatus, setAuthStatus] = useState(false);
  const [user, setUser] = useState('');
  const [favorites, setFavorites] = useState([])
  const [chatRooms, setChatRooms] = useState([])
  const getUserInfo = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      setFavorites(res.data.favorites)
      setChatRooms(res.data.rooms)
      setUser(res.data.user);
      setAuthStatus(true);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <HomeNav props={{ setAuthStatus, setUser, categories, chatRooms, setChatRooms, authStatus, user, favorites, setFavorites }} className="" />

      <main className='flex justify-center'>
        <Outlet
          context={{ categories, authStatus, setAuthStatus, user, setUser, favorites, chatRooms, setChatRooms, setFavorites }}
        />
      </main>
    </>
  );
};