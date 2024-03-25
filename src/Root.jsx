import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Root() {
  const {categories} = useLoaderData();
  const [signStatus, setSignStatus] = useState(false);
  const [pName, setPName] = useState('');

  const handlePName = (name) => setPName(name);
  const setStatusTrue = () => { setSignStatus(true) };
  const isSignedIn = async () => {
    const res = await axios.post('/api/checkss');
    if (res.data.success) {
      const {preferredName} = res.data.user;
      handlePName(preferredName);

      setStatusTrue();
    }
  }
  useEffect(() => {
    isSignedIn()
  },[])


  return (
    <>
      <HomeNav  props={{ setSignStatus, setPName, categories, signStatus, pName}} className=""/>

      <main className='flex justify-center'>
        <Outlet
        context={{categories, signStatus, setSignStatus, setPName, signStatus, setSignStatus}}
           />
      </main>

    </>
  );
}

