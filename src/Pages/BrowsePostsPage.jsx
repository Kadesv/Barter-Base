import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
import LikeButton from "../Components/LikeButton";
import axios from "axios";
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function BrowsePostsPage() {
  const { posts, userFavorites } = useLoaderData();
  const [filterOpen, setFilterOpen] = useState(false);
  const { categories, signStatus } = useOutletContext();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(userFavorites);

  const handleFavorite = async ({ postId }) => {
    if (!signStatus) {
      navigate('/signIn')
    }
    else {
      await axios.post(`/api/posts/favorite/${postId}`).then((res)=> setFavorites(res.data));
    }
  }

  // const handleNewChat=async(event,{user})=>{
  //   event.preventDefault();
  //   console.log(user.userId, message)

  //   const chatObj = {
  //     user2Id: user.userId,
  //     message: message
  //   }
  //   const res = await axios.post(`/api/chat/new`, chatObj)
  // }

  const postListItems = posts.map(({ image, user, postId, subCategoryId, title, categoryId, context, createdDate, price }) =>
  (

    <div key={postId} className="">
      <div className="card bg-base-100 shadow-xl m-1">
        <figure >
          <img src={image[0]} alt="IMAGE NOT FOUND" className=" h-full w-full rounded-xl" />
        </figure>
        <div className="card-body flex ">
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
            <dialog id={`model-popup${postId}`} className="modal w-auto ">
              <div className=" modal-box hero-content flex-col-reverse ">
                <div className="text-center items-center lg:text-left">
                  <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">{title}</h1>
                    <p className="py-6">{context}</p>
                  </div>

                  <div className="collapse bg-base-200">
                    <input id={'dropDownInput' + postId} type="checkbox" />
                    <div className="collapse-title ">
                      Message Seller
                    </div>
                    <form id={'messageForm' + postId} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content">
                      <input id={'messageInput' + postId} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder="Type Here..." />
                      <button className="btn btn-ghost">Send</button>
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
              <form id={'closeForm' + postId} method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <div className="form-control">
              <div className="w-full flex ">
                <LikeButton signStatus={signStatus} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
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
