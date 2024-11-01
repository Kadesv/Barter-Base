import { Outlet, useLoaderData } from 'react-router-dom';
import HomeNav from './HomeNav';
import { useAuth } from './UseAuth';

export default function Root() {
  const { categories } = useLoaderData();
  const { authUser, setAuthUser, favorites, setFavorites, chatRooms, setChatRooms, loading, showLoading } = useAuth();

  if (showLoading && loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HomeNav props={{ setAuthUser, categories, chatRooms, setChatRooms, authUser, favorites, setFavorites }} />
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
