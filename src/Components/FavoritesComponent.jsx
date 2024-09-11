import axios from "axios";
import { useEffect, useState } from "react";
import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";

export default function FavoritesComponent({ authUser, favorites, setFavorites }) {

  const handleFavorite = async ({ postId }) => {
    const i = favorites.findIndex((favorite) => favorite.postId === postId);
    const favCopy = [...favorites]
    favCopy.splice(i, 1)
    setFavorites(favCopy)
    await axios.post(`/api/posts/favorite/${postId}`);
  }

  const favMap = favorites.map(({ post: { image, context, title, price }, postId }) => {
    return (
      <div key={postId + 'favorite'} className=" bg-base-100 my-2  rounded-xl flex flex-row p-0 h-40">
        <figure >
          <img onClick={() => document.getElementById(`model-popup${postId}`).showModal()} src={image[0]} alt="IMAGE NOT FOUND" className=" h-full rounded-xl w-full " />
        </figure>
        <section className="flex flex-col">
          <h4 className="card-title" >{title}</h4>
          <div className="card-actions ">
            <dialog id={`model-popup${postId}`} className="modal  w-auto ">
              <div className=" modal-box hero-content  ">
                <div className="text-center items-center">
                  <div className="text-center">
                    <h1 className="text-5xl font-bold ">{title}</h1>
                    <p className="py-6">{context}</p>
                  </div>

                  <div className="collapse bg-base-200">
                    <input id={'dropDownInput' + postId + 'side'} type="checkbox" />
                    <div className="collapse-title ">
                      Message Seller
                    </div>
                    <form id={'messageForm' + postId + 'side'} onSubmit={(event) => {handleNewChat(event, { user, message }) }} className="collapse-content">
                      <input id={'messageInput' + postId + 'side'} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder="Type Here..." />
                      <button className="btn btn-ghost">Send</button>
                    </form>
                  </div>
                </div>
                <div className=" shadow-2xl bg-base-100">
                  <figure className=" carousel rounded-box">
                    <ImageMap images={image} />
                  </figure>
                </div>
              </div>
              <form id={'closeForm' + postId + 'side'} method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
            <LikeButton authUser={authUser} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
          </div>
        </section>
      </div>
    )
  })

  return (
    <>
      {favMap.toReversed()}
    </>
  )
}