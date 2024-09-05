import axios from "axios";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import AccountEditableForm from "../Components/AccountEditForm.jsx";
import NoSignAlert from "../Components/NoSignAlert.jsx";
import PostTemplate from "../Components/PostTemplate.jsx";
export default function AccountPage() {
  const { categories } = useOutletContext();
  const { user } = useLoaderData();
  const [showAccount, setShowAccount] = useState(true)
  const [isEditingAccount, setIsEditingAccount] = useState(false)
  const [showPosts, setShowPosts] = useState(false)
  const navigate = useNavigate()

  if (user === undefined) {
    navigate('/')
  }
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
    const res = await axios.put('/api/update', userInfo);
  }

  const handleCancelClick = (e) => {
    e.preventDefault();

  }

  return (
    <>

      <section className="menu flex flex-row items-center min-w-full justify-around w-full  p-4 w-80 min-h-full text-base-content">
        <div className="carousel carousel-vertical lg:w-2/3 sm:w-full min-w-min rounded-box ">
          {userPosts.length !== 0 ? userPosts : 'create a post and it will appear here'}
        </div>
        <div className="flex  w-1/3 rounded-xl justify-center h-1/2">
        {/* <AccountEditableForm isEditingAccount={isEditingAccount}  setIsEditingAccount={setIsEditingAccount} userInfo={userInfo} setUserInfo={setUserInfo} /> */}
        </div>
      </section>
    </>
  )
}