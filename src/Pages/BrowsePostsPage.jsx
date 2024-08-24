import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
import LikeButton from "../Components/LikeButton";
import axios from "axios";
import { useState } from 'react';
import { socket } from "../main";
export default function BrowsePostsPage() {
  const { posts } = useLoaderData();
  const [filterOpen, setFilterOpen] = useState(false);
  const { categories, authStatus, favorites, setFavorites } = useOutletContext();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  console.log(favorites)
  
  const handleFavorite = async (e, { postId }) => {
    e.preventDefault()
    if (!authStatus) {
      navigate('/signIn')
    }
    else {
      return (
        await axios.post(`/api/posts/favorite/${postId}`).then((res) => setFavorites(res.data))
      )
    }
  }

  const handleNewChat = async (event, { user }) => {
    event.preventDefault();
    if (!authStatus) {
      alert('must sign in for this')
    } else {
      const chatObj = {
        postOwner: user,
        message: message
      }
      console.log(chatObj)
      const res = await axios.post(`/api/chat/new`, chatObj)
      if (res.data.success) {
        socket.emit("send_message", res.data.newMessage)
      }
      setMessage('')
    }
  }

  const postListItems = posts.map(({ image, user, postId, subCategoryId, title, categoryId, context, createdDate, price }) =>
  (
    <div key={postId} className="">
      <div className="card card-compact bg-base-300 shadow-xl m-1">
        <figure onClick={() => document.getElementById(`model-popup${postId}`).showModal()} className="h-60 rouded pt-6 m-0">
          <img src={image[0]} alt="IMAGE NOT FOUND" className=" rounded h-auto w-auto " />
        </figure>
        <div className="card-body flex px-3 pb-2 pt-0">
          <div>
            <div className="tooltip tooltip-top" data-tip="Category">
              <div title="Category" className="badge badge-xs">{categories.find((cat) => cat.categoryId === categoryId).categoryName}</div>
            </div>
            <div className="tooltip tooltip-top" data-tip="Sub-Category">
              <div className="badge badge-xs">{categories.find((cat) => cat.categoryId === categoryId).subcategories.find((subCat) => subCat.subCategoryId === subCategoryId).subCategoryName}</div>
            </div>

          </div>
          <h2 className="card-title">{title}</h2>
          <div className="flex">
            <h2 className="card-context flex items-center">${price}</h2>
            <LikeButton authStatus={authStatus} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
          </div>
          <div className="card-actions">
            <dialog id={`model-popup${postId}`} className="modal">
              <div className=" modal-box hero-content -col-reverse ">
                <div className="text-center items-center lg:text-left">
                  <div className="text-center lg:text-left">
                    <h2 className="card-context flex items-center">${price}</h2>
                    <h1 className="text-5xl font-bold ">{title}</h1>
                    <p className="py-6 ">{context}</p>
                    <LikeButton authStatus={authStatus} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
                  </div>

                  <div className="collapse bg-base-200">
                    <input id={'dropDownInput' + postId + 'component'} type="checkbox" />
                    <div className="collapse-title ">
                      Message Seller
                    </div>
                    <form id={'messageForm' + postId + 'component'} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content">
                      <input id={'messageInput' + postId + 'component'} disabled={!authStatus} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder={authStatus ? 'Type Here...' : 'Please Log In first.'} />
                      {authStatus ? <button disabled={!authStatus} onClick={() => document.getElementById(`model-popup${postId}`).close()} className="btn btn-ghost">Send</button> :
                        <a className="btn btn-ghost" href='/signIn'>Log In</a>}

                    </form>
                  </div>
                </div>
                {/* popup images */}
                <div className=" shadow-2xl bg-base-100">
                  <figure className=" carousel rounded-box">
                    <ImageMap images={image} />

                  </figure>

                </div>
              </div>
              <form id={'closeForm' + postId + 'component'} method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  )
  );
  const filterComponent = () => {
    return (
      filterOpen ?
        <>
          <div className="drawer"> filterComponent</div>
        </>
        :
        <>
        </>
    )
  }

  return (
    <>
      <div className="grid  p-bottom-10 lg:grid-cols-3 gap-x-20   sm:grid-cols-2">
        {postListItems}

      </div>
    </>
  )
}
