import { Outlet, useLoaderData } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import { useAuth } from './UseAuth';

export default function Root() {
  const { categories } = useLoaderData();
  const { authUser, setAuthUser, favorites, setFavorites, chatRooms, setChatRooms, loading, showLoading } = useAuth();
  
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  // Set the height of the navbar after the component mounts
  useEffect(() => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  }, []);

  if (showLoading && loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Pass navHeight to HomeNav */}
      <HomeNav
        navRef={navRef}
        navHeight={navHeight}
        props={{ setAuthUser, categories, chatRooms, setChatRooms, authUser, favorites, setFavorites }}
      />
      <main
        style={{ backgroundImage: "linear-gradient(to top, #304352 0%, #d7d2cc 100%)" }}
        className='flex justify-center w-full'
      >
        <Outlet
          context={{ categories, authUser, setAuthUser, favorites, chatRooms, setChatRooms, setFavorites, navHeight }}
        />
      </main>
    </>
  );
}
