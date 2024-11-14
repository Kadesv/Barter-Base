import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import AccountEditableForm from "../Components/AccountEditForm.jsx";
import PostTemplate from "../Components/PostTemplate.jsx";
export default function AccountPage() {
  const { categories } = useOutletContext();
  const { user } = useLoaderData();
  const [showAccount, setShowAccount] = useState(true)
  const [showPosts, setShowPosts] = useState(false)
  const [isEditingAccount, setIsEditingAccount] = useState(true)
  const navigate = useNavigate()
  
  const [userInfo, setUserInfo] = useState({ firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode })

  const userPosts = user.posts.map(({ userId, image, postId, title, context, createdDate, price, categoryId, subCategoryId }) => {
    return (
      <PostTemplate
        key={postId}
        initialData={{ image, postId, userId, title, context, createdDate, price, categoryId, subCategoryId }}
        initialIsEditing={false}
        categories={categories}
        user={user}
      
      />
    )
  });
  const handleUserUpdate = async (e) => {
    e.preventDefault()
     await axios.put('/api/update', userInfo);
     setIsEditingAccount(false)
  }

  const handleCancelClick = (e) => {
    e.preventDefault();

    setUserInfo({firstName: user.firstName, lastName: user.lastName, email: user.email, state: user.state, city: user.city, zipCode: user.zipCode})
    setIsEditingAccount(false)
  }

  return (
    <>

      <section className="menu flex flex-row relative w-screen p-2  min-h-screen text-base-content">
        <div className="carousel carousel-vertical lg:w-2/3 sm:w-full min-w-min rounded-box ">
        <h2 className="text-3xl flex justify-center text-base-200">Posts</h2>
          {userPosts.length !== 0 ? userPosts : <h1 className="text-3xl flex justify-center text-base-200">Create A Post And It Will Appear Here!</h1>}
        </div>
        <div className="flex fixed top-24 right-10 w-fit h-4/5 rounded-xl justify-center">
        <AccountEditableForm isEditingAccount={isEditingAccount}  onAccSaveClick={handleUserUpdate} onAccCancelClick={handleCancelClick} setIsEditingAccount={setIsEditingAccount} userInfo={userInfo} setUserInfo={setUserInfo} />
        </div>
      </section>
    </>
  )
}