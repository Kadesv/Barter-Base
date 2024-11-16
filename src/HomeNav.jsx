import { useState } from 'react';
import TabComponent from './Components/TabComponent.jsx';
import Logo from './Components/Logo.jsx';
import LogButton from './Components/LogButton.jsx';

export default function HomeNav({ props, navRef}) {
  const { authUser, setAuthUser, chatRooms, setChatRooms, categories, favorites, setFavorites } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [activeTab, setActiveTab] = useState(null)

  const onTabClick = (value) => {
    if (activeTab !== value) {
      setActiveTab(value)
      setShowDrawer(true)
    } else if (value === 'Close') {
      setActiveTab(null)
      setShowDrawer(false)
    }
    else {
      setActiveTab(null)
      setShowDrawer(false)
    }
  }

  return (
    <nav ref={navRef} className="navbar  bg-base-300 sticky h-20 w-full top-0 z-20">
      <section className='navbar-start gap-3'>
        <button className="">
          <a href='/' className="overflow-clip ">
            <Logo />
          </a>
        </button>
        <LogButton
          setFavorites={setFavorites}
          setChatRooms={setChatRooms}
          setAuthUser={setAuthUser}
          authUser={authUser}
        />

      </section>
      <section className="drawer z-10 drawer-end">
        <input id="my-drawer-2" readOnly type="checkbox" className="drawer-toggle" checked={!!showDrawer} />
        <section className="drawer-content flex justify-end">

          {/* Page content here */}
          <label htmlFor="my-drawer-2" onClick={() => { onTabClick('Favorites') }} className="drawer-button btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="lg:w-6 lg:h-6 md:h-8 md:w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
            </svg>
          </label>

          <label htmlFor="my-drawer-2" onClick={() => { onTabClick('NewPost') }} className="drawer-button btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="lg:w-6 lg:h-6 md:h-8 md:w-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </label>

          <label htmlFor="my-drawer-2" onClick={() => { onTabClick('Chats') }} className="drawer-button btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="lg:w-6 lg:h-6 md:h-8 md:w-8" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
          </label>
        </section>

        <section className="drawer-side ">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" onClick={() => { onTabClick('Close') }} className="drawer-overlay"></label>
          <section className="menu flex items-center bg-base-200 p-4 w-80 min-h-full text-base-content">
            {/* Sidebar content here */}
            <TabComponent
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onTabClick={onTabClick}
              chatRooms={chatRooms}
              authUser={authUser}
              setShowDrawer={setShowDrawer}
              favorites={favorites}
              setFavorites={setFavorites}
              categories={categories} />
          </section>
        </section>
      </section>
    </nav>
  );
}
