import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Root() {
  const {categories} = useLoaderData();
  const [signStatus, setSignStatus] = useState(false);
  const [username, setUsername] = useState('Account');
  const navigate = useNavigate();

  const handleUserName = (name) => setUsername(name);
  const setStatusTrue = () => { setSignStatus(true) };
  const isSignedIn = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      const {username} = res.data.user;
      handleUserName(username);

      setStatusTrue();
    } else {
      navigate('/signIn')
    }
  }
  useEffect(() => {
    isSignedIn()
  }, [])

// console.log(categories)

  return (
    <>
      <HomeNav  props={categories}className=""/>

      <main className='flex justify-center'>
        <Outlet
        context={{categories, signStatus}}
           />
      </main>

    </>
  );
}

