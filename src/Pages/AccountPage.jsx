import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import AccountEditableForm from "../Components/AccountEditForm.jsx";
import NoSignAlert from "../Components/NoSignAlert.jsx";
import PostTemplate from "../Components/PostTemplate.jsx";
export default function AccountPage() {
  const { user } = useLoaderData();
  const { categories, authStatus } = useOutletContext();
  const [showAccount, setShowAccount] = useState(true)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  console.log(authStatus)
  if (user === undefined) {
    navigate('/')
  }

  const onAccountClick = () => {
    if (showAccount === false && showPosts === true) {
      setShowPosts(false)
      setShowAccount(true)
    }
  }

  const onPostsClick = () => {
    if (showAccount === true && showPosts === false) {
      setShowPosts(true)
      setShowAccount(false)
    }
  }

  // console.log(user)
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode })
  // console.log(user, userInfo)

  const userPosts = user.posts.map(({ image, postId, title, context, createdDate, price, categoryId, subCategoryId }) => {
    // console.log(createdDate, price, categoryId, subCategoryId)
    return (
      <PostTemplate
        key={postId}
        initialData={{ image, postId, title, context, createdDate, price, categoryId, subCategoryId }}
        initialIsEditing={false}
        categories={categories}
        authStatus={authStatus}
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

      <section className="menu flex items-center min-w-full justify-around  p-4 w-80 min-h-full text-base-content">
        <div className='tabs tabs-lifted'>
          <button onClick={() => { onAccountClick() }} className={showAccount ? 'tab tab-active' : 'tab'}>AccountInformation</button>
          <button onClick={() => { onPostsClick() }} className={showPosts ? 'tab tab-active' : 'tab'}>My Listings</button>
        </div>
        {showAccount ?
          <AccountEditableForm isEditingAccount={isEditingAccount} setIsEditingAccount={setIsEditingAccount} userInfo={userInfo} setUserInfo={setUserInfo} />
          : null
        }
        {showPosts ?
          <div className="carousel carousel-vertical rounded-box h-screen">
            {userPosts.length !== 0 ? userPosts : 'create a post and it will appear here'}
          </div>
          : null
        }
        {!authStatus ?
          <NoSignAlert />
          :
          null
        }

      </section>
    </>
  )
}