import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import AccountEditableForm from "../Components/AccountEditForm.jsx";
import NoSignAlert from "../Components/NoSignAlert.jsx";
import PostTemplate from "../Components/PostTemplate.jsx";
export default function AccountPage() {
  const { categories, authStatus } = useOutletContext();
  const { user } = useLoaderData();
  const [showAccount, setShowAccount] = useState(true)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  const navigate = useNavigate()

  if (user === undefined) {
    navigate('/')
  }
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

      <section className="menu flex flex-row items-center min-w-full justify-around  p-4 w-80 min-h-full text-base-content">
        <div className='tabs tabs-lifted sm:hidden'>
          <button onClick={() => { onAccountClick() }} className={showAccount ? 'tab tab-active' : 'tab'}>AccountInformation</button>
          <button onClick={() => { onPostsClick() }} className={showPosts ? 'tab tab-active' : 'tab'}>My Listings</button>
        </div>

        <div className="carousel carousel-vertical rounded-box h-screen">
          {userPosts.length !== 0 ? userPosts : 'create a post and it will appear here'}
        </div>
        <div className="flex flex-col rounded-xl fixed top-20 right-10">
        <AccountEditableForm isEditingAccount={isEditingAccount}  setIsEditingAccount={setIsEditingAccount} userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </section>
    </>
  )
}