import { useState } from 'react';
import SignPage from './Pages/SignPage.jsx';
import NewPostForm from './Components/NewPostForm.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




export default function HomeNav(props) {
  const navigate = useNavigate();
  const { signStatus, setSignStatus, username, setUsername } = props;
  const [showSign, setShowSign] = useState(false);


  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/logout');
    if (res.data.success) {
      setSignStatus(false);
      setUsername('Account')
      navigate('/');
    }
  };

  return (
    <>
    
      <div className="navbar bg-base-300 sticky top-0 z-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><a href='/'>Homepage</a></li>
              <li><a href='/account'>Account</a></li>
              <li><a href='/favorites'>Favorites</a></li>
              <li><a href='/about'>About</a></li>
              <li><a href='/sign'>Sign In</a></li>

            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a href='/' className="btn btn-ghost text-xl">LSK</a>
        </div>
        <div className="navbar-end">


          <div className="drawer drawer-end">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex justify-end">
              {/* Page content here */}
              <label htmlFor="my-drawer-2" className="drawer-button btn btn-ghost btn-circle"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
              <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here */}
             <NewPostForm/>
              </div>
            </div>
          </div>

            <a href="/messages" className="btn btn-ghost btn-circle" >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="h-5 w-5" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            </a>

          <a className="btn btn-ghost btn-circle" href="/notifications">
            <div className="indicator dropdown">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
            
          </a>

        </div>
      </div>
  
    </>
  );
}
