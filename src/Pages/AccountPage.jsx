import axios from "axios";
import { useEffect, useState} from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import PostTemplate from "../Components/PostComponents/PostTemplate.jsx"
export default function AccountPage() {
  const { user} = useLoaderData();
  if(user === undefined){
    navigate('/')
  }
  // console.log(user)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode })
  // console.log(user, userInfo)

  const userPosts = user.posts.map(({ image, postId, title, context, createdDate, price  }) => {
    // console.log()
    return(
      <PostTemplate
      key={postId}
      initialData={{ postId, title, context, image }}
      initialIsEditing={false}

  />
    )
  });
  const handleUserUpdate = async (e) => {
    e.preventDefault()
    const res = await axios.put('/api/update', userInfo);
    console.log(res)
  }


  return (
    <>
      <div className='min-w-full '>
        <section
          className="flex justify-around"
        >
          <div className="carousel carousel-vertical rounded-box h-screen">
            <h1 className="flex justify-center bg-base-neutral text-xl p-4">My Listings</h1>
             {userPosts.length !== 0 ? userPosts : 'create a post and it will appear here'}
          </div>
          <div>

            <h3 className="flex justify-center text-xl p-4">Account Information</h3>
            <form
              id='accountInfoForm'
              onSubmit={(e) => handleUserUpdate(e)}
              className="grid">
              <label className="input flex items-center gap-2">
                <input
                  id="accountFNameInput"
                  value={userInfo.firstName === null ? '' : userInfo.firstName}
                  onChange={(e) => setUserInfo({ ...userInfo, firstName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="First Name" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  id="accountLNameInput"
                  value={userInfo.lastName === null ? '' : userInfo.lastName}
                  onChange={(e) => setUserInfo({ ...userInfo, lastName: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Last Name" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  id="accountEmailInput"
                  value={userInfo.email === null ? '' : userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Email" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  id="accountCityInput"
                  value={userInfo.city === null ? '' : userInfo.city}
                  onChange={(e) => setUserInfo({ ...userInfo, city: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="City" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  id="accountStateInput"
                  value={userInfo.state === null ? '' : userInfo.state}
                  onChange={(e) => setUserInfo({ ...userInfo, state: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="State" />
              </label>

              <label className="input flex items-center gap-2">
                <input
                  id="accountZipCodeInput"
                  value={userInfo.zipCode === null ? '' : userInfo.zipCode}
                  onChange={(e) => setUserInfo({ ...userInfo, zipCode: e.target.value })}
                  className="input m-1 input-ghost"
                  placeholder="Zipcode" />
              </label>

              <button className="btn btn-success" type="submit">Save</button>
              <button
                onClick={()=>onCancelClick}
                className="btn btn-error"
              >cancel</button>
            </form>
          </div>
        </section>
      </div>
    </>
  )
}