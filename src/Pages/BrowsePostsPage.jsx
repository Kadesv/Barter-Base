import { useLoaderData, useOutletContext } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
import axios from "axios";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function BrowsePostsPage() {
  const { posts, userFavorites } = useLoaderData();
  const [filterOpen, setFilterOpen] = useState(false);
  const { categories, signStatus, } = useOutletContext();
  const [message, setMessage] = useState('');

  console.log(userFavorites);

  const handleNewPost = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/posts/new', formData);

    if (res.data.success) {
      handleClose();
      navigate('/');
    }
    handleClose();
    console.log('bad news')

  };

  const handleFavoriting = async ({ postId }) => {
    console.log(postId)
    const res = await axios.get('/api/posts/favoriting/:postId', {
      params: {
        postId: postId
      }
    })
    console.log(res.data);
  }
  const noImageFound = 'https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2Fdownload%20(1).jpg?alt=media&token=20dbf847-ca45-4cd9-9014-0416c5b26e39'

  // const handleNewChat=async(event,{user})=>{
  //   event.preventDefault();
  //   console.log(user.userId, message)

  //   const chatObj = {
  //     user2Id: user.userId,
  //     message: message
  //   }
  //   const res = await axios.post(`/api/chat/new`, chatObj)
  // }
  console.log(userFavorites)

const checkFavorites = (postId) =>{
  const findFav = userFavorites.find((favorite) => favorite.postId === postId);
  if(findFav){
    return true
  }
  return false

  }


  const postListItems = posts.map(({ image, user, postId, subCategoryId, title, categoryId, context, favorites, createdDate, price }) =>
  (
    
    <div key={postId} className="">
     
      <div className="card bg-base-100 shadow-xl m-1">
        <figure >
          <img src={image[0]} alt="IMAGE NOT FOUND"className=" h-full w-full rounded-xl" style={{backgroundImage:`url(${noImageFound})`}} />
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

            <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>Read More</button>
            <dialog id="my_modal_5" className="modal w-auto ">
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
                    <img src={image} className=" carousel-item h-full w-full rounded-xl" />

                  </figure>
                </div>
              </div>
              <form id={'closeForm' + postId} method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>

            <div className="form-control">
              <div className="w-full flex ">
                <input
                  defaultChecked={checkFavorites(postId)}
                  disabled={!signStatus}
                  onClick={() => handleFavoriting({ postId})}
                  id={'favoriteCheckbox' + postId}
                  // defaultChecked={}
                  className="
                  relative peer shrink-0
                  appearance-none w-6 h-6   
                  mt-1 bg-transparent
                "
                  type="checkbox"
                />
                <svg
                  className="absolute pointer-events-none border-transparent fill-current  peer-checked:!fill-warning mt-1 w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" strokeWidth={1.5} stroke="" >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
                {/* <div className="badge badge-xs">{favorites.length}</div> */}


                <label htmlFor={'favoriteCheckbox' + postId}>
                </label>
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

{/* <a className="btn btn-primary" href={`/posts/${postId}`}>Read more</a> */ }