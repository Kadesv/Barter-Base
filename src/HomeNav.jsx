import { useState } from 'react';
import NewPostForm from './Components/NewPostForm.jsx';
import ChatRoomList from './Components/ChatRoomList.jsx';
import NoSignAlert from './Components/NoSignAlert.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogButton from './Components/LogButton.jsx';
import FavoritesComponent from './Components/FavoritesComponent.jsx';

export default function HomeNav({ props }) {
  const navigate = useNavigate();
  const { authUser, authStatus, setAuthStatus, chatRooms, setChatRooms, categories, favorites, setFavorites } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      setAuthStatus(false);
      setFavorites([]);
      setChatRooms([])
      navigate('/');
    }
  };

  const onFavoriteClick = () => {
    setShowDrawer(true)
    if (showFavorites === false) {
      setShowFavorites(true)
      setShowChat(false)
      setShowPost(false)
    } else if (showFavorites === true) {
      setShowDrawer(false)
      setShowFavorites(false)
      setShowPost(false)
      setShowChat(false)
    }
  }

  const onNewPostClick = () => {
    setShowDrawer(true)
    if (showPost === false) {
      setShowPost(true)
      setShowChat(false)
      setShowFavorites(false)
    } else if (showPost === true) {
      setShowDrawer(false)
      setShowPost(false)
      setShowFavorites(false)
      setShowChat(false)
    }
  }

  const onChatClick = () => {
    setShowDrawer(true)
    if (showChat === false) {
      setShowChat(true)
      setShowPost(false)
      setShowFavorites(false)
    } else if (showChat === true) {
      setShowDrawer(false)
      setShowChat(false)
      setShowFavorites(false)
      setShowPost(false)

    }
  }
  const closeAllClick = () => {
    setShowDrawer(false)
    setShowChat(false)
    setShowFavorites(false)
    setShowPost(false)
  }
  const AccountLink = () => {
    return (
      authStatus ?
        <>
          <a href='/account'>Account</a>
        </>
        :
        <>

          <a href='/signIn'>Account</a>
        </>
    )
  }

  return (
    <>
      <nav className="navbar bg-base-300 sticky top-0 z-10">
        <section className="navbar-start">
          <article className="dropdown">
            <button tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </button>

            <ul tabIndex={0} className="menu menu-sm bg-base-200 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href='/'>Homepage</a></li>
              <li><AccountLink /></li>
              <li><a href='/favorites'>Favorites</a></li>
              <LogButton handleLogOut={(e) => handleLogout(e)} authStatus={authStatus} />


              {/* <li><a href='/about'>About</a></li> */}

            </ul>
          </article>
        </section>
        <button className="navbar-center">
          <a href='/' className="btn btn-ghost text-4xl">LSK</a>
        </button>
        <section className="navbar-end">
          <section style={{ height: '60px', width: '60px' }} className="drawer z-10 drawer-end fixed right-0">
            <input id="my-drawer-2" readOnly type="checkbox" className="drawer-toggle" checked={!!showDrawer} />
            <section className="drawer-content flex justify-end">

              {/* Page content here */}
              <label htmlFor="my-drawer-2" onClick={() => { onFavoriteClick() }} className="drawer-button btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </label>

              <label htmlFor="my-drawer-2" onClick={() => { onNewPostClick() }} className="drawer-button btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </label>

              <label htmlFor="my-drawer-2" onClick={() => { onChatClick() }} className="drawer-button btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-6 w-6" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
              </label>
            </section>

            <section className="drawer-side ">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" onClick={() => { closeAllClick() }} className="drawer-overlay"></label>
              <section className="menu flex items-center bg-base-200 p-4 w-80 min-h-full text-base-content">
                {/* Sidebar content here */}
                <div className='tabs tabs-bordered'>
                  <button onClick={() => { onFavoriteClick() }} className={showFavorites ? 'tab tab-active' : 'tab'}>Favorites</button>
                  <button onClick={() => { onNewPostClick() }} className={showPost ? 'tab tab-active' : 'tab'}>New Post</button>
                  <button onClick={() => { onChatClick() }} className={showChat ? 'tab tab-active' : 'tab'}>Chats</button>
                </div>
                {showFavorites ?
                  <FavoritesComponent authStatus={authStatus} setFavorites={setFavorites} favorites={favorites} categories={categories} />
                  : null
                }
                {showPost ?
                  <NewPostForm categories={categories} authStatus={authStatus} setShowPost={setShowPost} />
                  : null
                }
                {showChat ?
                  <ChatRoomList chatRooms={chatRooms} user={authUser} />
                  : null
                }
                {!authStatus ?
                  <NoSignAlert />
                  :
                  null
                }

              </section>
            </section>
          </section>
        </section>
      </nav>
    </>
  );
}
