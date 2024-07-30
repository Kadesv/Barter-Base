import axios from "axios";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import PostTemplate from "../Components/PostComponents/PostTemplate.jsx"
export default function AccountPage() {
  const { user} = useLoaderData();
  console.log(user)
  const [userInfo, setUserInfo] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode })
  console.log(user, userInfo)

  const userPosts = user.posts.map(({ image, postId, title, context, createdDate, price  }) => {
    console.log()
    return(
      <PostTemplate
      key={postId}
      initialData={{ postId, title, context }}
      initialIsEditing={false}

  />
    )
  });
  const handleUserUpdate = async (e) => {
    e.preventDefault()
    console.log(userInfo)
    const res = await axios.post('/api/auth/update', userInfo);
    console.log(res)


  }
  return (
    <>
      <div className='w-full h-screen'>
        <section
          className="flex content-evenly"
        >
          <div>
            <h1 className="flex justify-center text-xl p-4">My Listings</h1>
              {userPosts}
          </div>
          <div>

            <h3 className="flex justify-center text-xl p-4">Account Information</h3>
            <form

              onSubmit={(e) => handleUserUpdate(e)}
              className="grid">
              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.firstName === null ? '' : userInfo.firstName}
                  onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="First Name" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.lastName === null ? '' : userInfo.lastName}
                  onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Last Name" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.email === null ? '' : userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Email" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.city === null ? '' : userInfo.city}
                  onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="City" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.state === null ? '' : userInfo.state}
                  onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="State" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  value={userInfo.zipCode === null ? '' : userInfo.zipCode}
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