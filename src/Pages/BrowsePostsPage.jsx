import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
import LikeButton from "../Components/LikeButton";
import axios from "axios";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function BrowsePostsPage() {
  const { posts } = useLoaderData();
  const [filterOpen, setFilterOpen] = useState(false);
  const { categories, authStatus, favorites, setFavorites } = useOutletContext();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFavorite = async ({ postId }) => {
    if (!authStatus) {
      navigate('/signIn')
    }
    else {
      return (
        await axios.post(`/api/posts/favorite/${postId}`).then((res) => setFavorites(res.data))
      )
    }
  }

  const handleNewChat=async(event, {user})=>{
    event.preventDefault();
    if(!authStatus){
      alert('must sign in for this')
    } else{
    const chatObj = {
      postOwner: user,
      message: message
    }

    const res = await axios.post(`/api/chat/new`, chatObj)
    console.log(res)
if(res.data.success){
  socket.emit("send_message",  res.data.newMessage)
}
setMessage('')
  }}

  const postListItems = posts.map(({ image, user, postId, subCategoryId, title, categoryId, context, createdDate, price }) =>
  (
           <div key={postId} className="">
      <div className="card bg-base-100 shadow-xl m-1">
        <figure className="h-60 rouded pt-6 m-0">
          <img src={image[0]} alt="IMAGE NOT FOUND" className=" rounded h-auto w-auto " />
        </figure>
        <div  className="card-body flex px-3 pb-2 pt-0">
          <div>
            <div className="tooltip tooltip-top" data-tip="Category">
              <div title="Category" className="badge badge-info badge-xs">{categories[categoryId - 1].categoryName}</div>
            </div>
            <div className="tooltip tooltip-top" data-tip="Sub-Category">
                           <div className="badge badge-xs">{categories[categoryId - 1].subcategories[subCategoryId - 1].subCategoryName}</div>

            </div>
            
          </div>
          <h2 className="card-title">{title}</h2>
          <div className="card-actions">
            <button className="btn" onClick={() => document.getElementById(`model-popup${postId}`).showModal()}>Read More</button>
            <dialog id={`model-popup${postId}`} className="modal  w-auto ">
                <div className=" modal-box hero-content -col-reverse ">
                  <div className="text-center items-center lg:text-left">
                    <div className="text-center lg:text-left">
                      <h1 className="text-5xl font-bold ">{title}</h1>
                      <p className="py-6">{context}</p>
                    </div>

                    <div className="collapse bg-base-200">
                      <input id={'dropDownInput' + postId + 'component'} type="checkbox" />
                      <div className="collapse-title ">
                        Message Seller
                      </div>
                      <form id={'messageForm' + postId + 'component'} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content">
                        <input id={'messageInput' + postId + 'component'} disabled={!authStatus}onChange={(e) => (setMessage(e.target.value))} className="input" placeholder={authStatus ? 'Type Here...':'Please Sign In first.'} />
                        <button  disabled={!authStatus} onClick={() => document.getElementById(`model-popup${postId}`).close()} className="btn btn-ghost">Send</button>
                        <a className="btn btn-ghost"href='/signIn'>Sign In</a>

                      </form>
                    </div>
                  </div>
                  {/* popup images */}
                  <div className=" shadow-2xl bg-base-100">
                    <figure className=" carousel rounded-box">
                   <ImageMap images={image}/>

                    </figure>
                  </div>
                </div>
                <form id={'closeForm' + postId + 'component'} method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

            <div className="form-control">
              <div className="w-full flex ">
                <LikeButton authStatus={authStatus} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
              </div>
            </div>
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
      <div className="grid  p-bottom-10 lg:grid-cols-3 gap-x-20   sm:grid-cols-1">
        {filterComponent()}
        {postListItems}

      </div>
    </>
  )
}
