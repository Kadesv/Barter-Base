import { useState } from 'react';
import NewPostForm from './Components/NewPostForm.jsx';
import ChatRoomList from './Components/ChatRoomList.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './Components/LogoutButton.jsx';

export default function HomeNav({ props }) {
  const navigate = useNavigate();
  const { signStatus, setSignStatus, pName, setPName, categories } = props;
  const [showDrawer, setShowDrawer] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      setSignStatus(false);
      setPName('')
      navigate('/');
    }
  };
  const onNewPostClick = () => {
    setShowDrawer(true)
    if(showPost === false){
    setShowPost(true)
    setShowChat(false)
    } else if( showPost === true){
    setShowDrawer(false)
    setShowPost(false)
    }
  }
  const onChatClick = () => {
    setShowDrawer(true)
    if(showChat === false){
      setShowChat(true)
      setShowPost(false)
      } else if( showChat === true){
        setShowDrawer(false)
      setShowChat(false)
      } 
  }
  const AccountLink = () => {
    return (
      signStatus ?
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
            {pName}

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href='/'>Homepage</a></li>
              <li><AccountLink/></li>
              <li><a href='/favorites'>Favorites</a></li>
              {/* <li><a href='/about'>About</a></li> */}
              <li><LogoutButton handleLogOut={(e) => handleLogout(e)} signStatus={signStatus} /></li>

            </ul>
          </article>
        </section>
        <button className="navbar-center">
          <a href='/' className="btn btn-ghost text-4xl">LSK</a>
        </button>
        <section className="navbar-end">
          <section style={{height:'60px', width:'60px'}} className="drawer z-10 drawer-end fixed right-0">
            <input id="my-drawer-2" readOnly type="checkbox" className="drawer-toggle" checked={!!showDrawer} />
            <section className="drawer-content flex justify-end">
              {/* Page content here */}
              <label  htmlFor="my-drawer-2" onClick={()=>{onNewPostClick()}}className="drawer-button btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              </label>
              <label  htmlFor="my-drawer-2" onClick={()=>{onChatClick()}}className="drawer-button btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
              </label>
            </section>
            <section className="drawer-side ">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" onClick={()=>{setShowDrawer(false)}}className="drawer-overlay"></label>
              <section className={!signStatus ? 'bg-base-200 pointer-events-none menu  p-4 w-80 min-h-full flex items-center text-base-content' : "menu  flex items-center bg-base-200 p-4 w-80 min-h-full text-base-content"}>
                {/* Sidebar content here */}
                <div>
                <button  onClick={()=>{onNewPostClick()}}className='btn'>New Post</button>
              <button   onClick={()=>{onChatClick()}} className='btn'>Chats</button>
              </div>
              { showPost ?
                <NewPostForm categories={categories} signStatus={signStatus} setShowPost={setShowPost}/>
                  : null
              }
               { showChat ?
                <ChatRoomList/>
                  : null
              }
              </section>
            </section>
          </section>
        </section>
      </nav>
    </>
  );
}
