import axios from "axios";
import { useEffect, useState } from "react";

export default function AccountPage() {
  const [user, setUser] = useState({ email: '', firstName: '', lastName: '', userId: '' })
  const [posts, setPosts] = useState([])

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


    const postListItems = posts.map(({ image, user, postId, title, context, createdDate, price  }) => {
      return(
        <postTemplate
        key={postId}
        initialData={{ postId, title, context }}
        initialIsEditing={false}
  
    />
      )
    });

  return (
    <>
      <div className='w-full'>
        {/* <section className='text-xl'>
          <h1>{user.firstName} {user.lastName}</h1>
        </section> */}
        <section>
          <h1 className="flex justify-center text-xl p-4">My Listings</h1>
          <div>
            <h3 className="flex justify-center text-xl p-4">Account Information</h3>
           




          </div>
          <div className=" grid lg:grid-cols-3 gap-20  sm:grid-cols-2">
            {userPosts}
          </div>
        </section>
      </div>
    </>
  )
}