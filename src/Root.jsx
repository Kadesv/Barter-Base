import { Outlet, useLoaderData } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import { useAuth } from './UseAuth';

export default function Root() {
  const { categories } = useLoaderData();
  const { authUser, setAuthUser, favorites, setFavorites, chatRooms, setChatRooms, loading, showLoading } = useAuth();
  
  const navRef = useRef(null);
  const [navHeight, setNavHeight] = useState(0);

  // Function to update the navHeight
  const updateNavHeight = () => {
    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }
  };

  useEffect(() => {
    // Set initial navHeight
    updateNavHeight();

    // Update navHeight on window resize
    window.addEventListener('resize', updateNavHeight);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', updateNavHeight);
    };
  }, []);

  if (showLoading && loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Pass navHeight to HomeNav */}
      <HomeNav
        navRef={navRef}
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
