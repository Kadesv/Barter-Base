import { useState } from 'react';
import SignPage from './Pages/SignPage.jsx';
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
</>
  );
}
