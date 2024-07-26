import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import PostTemplate from "../Components/PostComponents/PostTemplate.jsx"
export default function AccountPage() {
  const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', email: '', state: '', city: '', zipCode: '' })
  const { categories, authStatus, favorites, setUser, user, setFavorites } = useOutletContext();
  console.log(userInfo)
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
      <div className='w-full h-screen'>
        <section
          className="flex content-evenly"
        >
          <div>
            <h1 className="flex justify-center text-xl p-4">My Listings</h1>

          </div>
          <div>

            <h3 className="flex justify-center text-xl p-4">Account Information</h3>
            {/* setData({...data, [key]: value}); */}
            <form className="grid">
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="First Name" />
              </label>
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Last Name" />
              </label>
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Email" />
              </label>
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="City" />
              </label>
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="State" />
              </label>
              <label className="input flex items-center gap-2">
                <input
                  onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Zipcode" />
              </label>
              <button className="btn btn-success" type="submit">Save</button>
              <button
                className="btn btn-error"
              >undo changes</button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}