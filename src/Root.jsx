import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Root() {
  const { categories } = useLoaderData();
  const [signStatus, setSignStatus] = useState(false);
  const [pName, setPName] = useState('');
  const [favorites, setFavorites] = useState([])



  const handlePName = (name) => setPName(name);
  const setStatusTrue = () => { setSignStatus(true) };

  const getFavorites = async () => {
  const res = await axios.get('/api/posts/getFavorites')

  if(!res.data.message){
    const userFavorites = res.data;
    setFavorites(userFavorites)
    // console.log(userFavorites)
  }

  };
  const isSignedIn = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      const { preferredName } = res.data.user;
      handlePName(preferredName);
      setStatusTrue();
    }
  };
  useEffect(() => {
    isSignedIn();
    getFavorites();
  }, []);

  return (
    <>
      <HomeNav props={{ setSignStatus, setPName, categories, signStatus, pName, favorites, setFavorites }} className="" />

      <main className='flex justify-center'>
        <Outlet
          context={{ categories, signStatus, setSignStatus, setPName, favorites, setFavorites }}
        />
      </main>
    </>
  );
};
