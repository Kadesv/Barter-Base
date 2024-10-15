import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { socket } from "./main"

import { useState, useEffect } from 'react';

export default function Root() {
  const { categories } = useLoaderData();
  const [authUser, setAuthUser] = useState(null);
  const [favorites, setFavorites] = useState([])
  const [chatRooms, setChatRooms] = useState([])
  const getUserInfo = async () => {
    const res = await axios.post('/api/authCheck');
    if (res.data.success) {
      setFavorites(res.data.favorites)
      setChatRooms(res.data.rooms)
      socket.emit('join_room', res.data.rooms)
      setAuthUser(res.data.user);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <HomeNav props={{ setAuthUser, categories, chatRooms, setChatRooms, authUser, favorites, setFavorites }} className="" />
      <main
        style={{ "backgroundImage": "linear-gradient(to top, #304352 0%, #d7d2cc 100%)" }}
        className='flex justify-center w-full'>
        <Outlet
          context={{ categories, authUser, setAuthUser, favorites, chatRooms, setChatRooms, setFavorites }}
        />
      </main>
    </>
  );
};