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
  // Use Effect to change ref if window changes
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
        className='flex justify-center bg-gray-200 w-full'
      >
        <Outlet
          context={{ categories, authUser, setAuthUser, favorites, chatRooms, setChatRooms, setFavorites, navHeight }}
        />
      </main>
    </>
  );
}
