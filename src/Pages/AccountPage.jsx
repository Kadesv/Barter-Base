import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState({ email: '', firstName: '', lastName: '', userId: '' })

  useEffect(() => {
    const showUserInfo = async () => {
      const res = await axios.post('/api/checkss');
      if (res.data.success) {
        const user = res.data.user;
        setUser(user);
      }
    };
    showUserInfo();
  }, [])

  return (
    <>
      <div className='w-full'>
        <section className='text-xl'>
          <h1>{user.firstName} {user.lastName}</h1>
        </section>
        <section>
          <h1>My Listings</h1>
        </section>
        <section>
          <h1>Favorite Listings</h1>
        </section>
      </div>
    </>
  )
}