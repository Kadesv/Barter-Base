import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostTemplate from "../Components/PostComponents/PostTemplate.jsx"
export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({ email: '', firstName: '', lastName: '', userId: '' })
  const { categories, authStatus, favorites, setUser, user, setFavorites } = useOutletContext();
console.log(user)
    // const userPosts = user.posts.map(({ image, postId, title, context, createdDate, price  }) => {
    //   console.log()
    //   return(
    //     <PostTemplate
    //     key={postId}
    //     initialData={{ postId, title, context }}
    //     initialIsEditing={false}
  
    // />
    //   )
    // });

  return (
    <>
      <div className='w-full'>
        <section>
          <h1 className="flex justify-center text-xl p-4">My Listings</h1>
          <div>

            <h3 className="flex justify-center text-xl p-4">Account Information</h3>
           
          </div>
          <div className=" grid lg:grid-cols-3 gap-20  sm:grid-cols-2">
            {/* {userPosts} */}
          </div>
        </section>
      </div>
    </>
  )
}