import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
import LikeButton from "../Components/LikeButton";
import axios from "axios";
import { useState } from 'react';
import { socket } from "../main";
export default function BrowsePostsPage() {
  const { posts } = useLoaderData();
  const [filterOpen, setFilterOpen] = useState(false);
  const { categories, favorites, setFavorites, authUser } = useOutletContext();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFavorite = async (e, { postId }) => {
    e.preventDefault()
    if (!authUser) {
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
    if (!authUser) {
      alert('must sign in for this')
    } else {
      const chatObj = {
        postOwner: user,
        message: message
      }
      const res = await axios.post(`/api/chat/new`, chatObj)
      if (res.data.success) {
        socket.emit("send_message", res.data.newMessage)
      }
      setMessage('')
    }
  }

  const postListItems = posts.map(({ image, user, postId, subCategoryId, title, categoryId, context, createdDate, price }) =>
  (
    <div key={postId} className="my-5">
      <div className="card card-compact bg-base-100 shadow-2xl shadow-black m-1">
        {/*click on image to see more details */}
        <figure onClick={() => document.getElementById(`model-popup${postId}`).showModal()} className="h-auto min-h-96 w-full rounded  mt-2 m-0">
          <img src={image[0]} alt="IMAGE NOT FOUND" className=" rounded h-auto w-4/5 " />
        </figure>
        <div className="card-body flex px-1 pb-1 pt-0">
          {/* badges */}
          <div>
            <div className="tooltip tooltip-top" data-tip="Category">
              <div title="Category" className="badge border-transparent badge-xs">{categories.find((cat) => cat.categoryId === categoryId).categoryName}</div>
            </div>

            <div className="tooltip tooltip-top" data-tip="Sub-Category">
              <div className="badge border-transparent badge-xs">{categories.find((cat) => cat.categoryId === categoryId).subcategories.find((subCat) => subCat.subCategoryId === subCategoryId).subCategoryName}</div>
            </div>
          </div>

          <h2 className="card-title text-3xl">{title}</h2>

          <div className="flex">
            <h2 className="card-context flex items-center">${price}</h2>
            <LikeButton authUser={authUser} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
          </div>

          <div className="card-actions">
            <dialog id={`model-popup${postId}`} className="modal">
              <div className=" modal-box shadow-xl w-3/4 flex  ">
                <div className="text-center items-center">

                  <div className="text-center mb-2">
                    <h2 className="card-context flex items-center">${price}</h2>
                    <h1 className="text-5xl font-bold ">{title}</h1>
                    <p className="py-6 ">{context}</p>
                    <LikeButton authUser={authUser} user={authUser} postId={postId} favorites={favorites} handleFavorite={handleFavorite} />
                  </div>

                  <div className="collapse bg-base-200">
                    <input id={'dropDownInput' + postId + 'component'} type="checkbox" />
                    <div className="collapse-title ">
                      Message Seller
                    </div>

                    <form id={'messageForm' + postId + 'component'} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content">
                      <input id={'messageInput' + postId + 'component'} disabled={!authUser} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder={authUser ? 'Type Here...' : 'Please Log In first.'} />
                      {authUser ? <button disabled={!authUser} onClick={() => document.getElementById(`model-popup${postId}`).close()} className="btn btn-ghost">Send</button> :
                        <a className="btn btn-ghost" href='/signIn'>Log In</a>}
                    </form>

                  </div>
                </div>

                <div className="  ml-3 bg-base-100">
                  <figure className=" carousel bg-transparent rounded-box">
                    <ImageMap images={image} userId={user.userId} user={authUser} />
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
    <div>
      <div className="grid  p-bottom-10 lg:grid-cols-3 gap-x-20 sm:grid-cols-2">
        {postListItems}
      </div>
      <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
        <nav className="grid grid-flow-col gap-4">
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current">
                <path
                  d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
        <aside>
          <p>Copyright © {new Date().getFullYear()} - There are no Copyrights</p>
        </aside>
      </footer>
    </div>
  )
}
