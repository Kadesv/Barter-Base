import axios from "axios";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";

export default function FavoritesComponent({ signStatus, favorites, setFavorites, categories }) {

  const handleFavorite = async ({ postId }) => {
    const i = favorites.findIndex((favorite)=> favorite.postId === postId);
    const favCopy = [...favorites]
    favCopy.splice(i,1)
    setFavorites(favCopy)
      await axios.post(`/api/posts/favorite/${postId}`);
}


  const favMap = favorites.map(({ post: { image, context, title }, postId }) => {
    return (
      <div key={postId + 'component'} className="">
        <div className="card bg-base-100  m-1 ">

          <div className="card-body side-component flex flex-row p-0 h-40">

            <figure >
              <img src={image[0]} alt="IMAGE NOT FOUND" className=" h-full w-full rounded-xl" />
            </figure>
            <button as='h4' className="card-title w-10" onClick={() => document.getElementById(`model-popup${postId}`).showModal()}>{title}</button>
            <div className="card-actions ">

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
                        <input id={'messageInput' + postId + 'component'} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder="Type Here..." />
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
                <form id={'closeForm' + postId + 'component'} method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>

              <div className="form-control ">
                <div className="w-full  ">
                  <LikeButton signStatus={signStatus} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return (
    <>
      <div className='w-full'>
        <section>
          <h1 className="flex justify-center">Favorites</h1>
          {favMap.toReversed()}
          <div className="">
          </div>
        </section>
      </div>
    </>
  )
}