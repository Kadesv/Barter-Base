import axios from "axios";
import { PostModal } from "./PostModal";
import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";

export default function FavoritesComponent({ authUser, categories, favorites, setFavorites }) {

  const handleFavorite = async ({ postId }) => {
    const i = favorites.findIndex((favorite) => favorite.postId === postId);
    const favCopy = [...favorites]
    favCopy.splice(i, 1)
    setFavorites(favCopy)
    await axios.post(`/api/posts/favorite/${postId}`);
  }

  const favMap = favorites.map(({ post, postId, post: { title } }) => {
    return (
      <div key={postId + 'favorite'} className=" bg-base-100 my-2 shadow-lg rounded-xl flex flex-row p-0 h-40">
        <figure >
          <img
            onClick={() => document.getElementById(`model-popup${postId}`).showModal()}
            src={post.image[0]}
            alt="IMAGE"
            onError={(e) => e.target.src = 'https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1ahttps://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=7a1ce6ab-0fe6-4c83-bf67-f60be6be4d55'}
            className=' max-h-full max-w-full h-full rounded'
          />
        </figure>
        <section className="flex flex-col">
          <h4 className="card-title" >{title}</h4>
          <div className="card-actions ">
            <PostModal post={post} categories={categories} location={'sideComponent'}/>
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