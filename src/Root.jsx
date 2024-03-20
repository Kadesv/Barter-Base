import { Outlet, useLoaderData} from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Root() {
  const {categories, subCategories} = useLoaderData();
  const [signStatus, setSignStatus] = useState(false);
  const [username, setUsername] = useState('Account');


  const handleUserName = (name) => setUsername(name);
  const setStatusTrue = () => { setSignStatus(true) };
  const isSignedIn = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      const {username} = res.data.user;
      handleUserName(username);

      setStatusTrue();
    }
  }
  useEffect(() => {
    isSignedIn()
  }, [])



  return (
    <>
      <HomeNav  className=""/>

      <main className='flex justify-end'>
        <Outlet
           />
      </main>

    </>
  );
}

