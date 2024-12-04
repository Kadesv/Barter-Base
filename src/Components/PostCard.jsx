import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { PostModal } from "./PostModal";
import { useState } from "react";
import axios from "axios";

const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function PostCard({ post, categories, favorites, authUser, setFavorites }) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const backupLink = "https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1a";
  
  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!authUser) {
      navigate("/signIn");
    } else {
      try {
        const res = await axios.post(`/api/posts/favorite/${post.postId}`);
        setFavorites(res.data);
      } catch (error) {
        console.error("Error favoriting post", error);
      }
    }
  };

  const handleModalOpen = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!["BUTTON", "SVG"].includes(e.target.tagName)) {
      setModalOpen(true)
    }
  };

  const category = categories.find((cat) => cat.categoryId === post.categoryId);
  const subCategory = category?.subcategories.find(
    (sub) => sub.subCategoryId === post.subCategoryId
  );

  return (
    <div className="m-3 flex h-full w-full justify-center gap-10">
      <div
        onClick={(e)=>handleModalOpen(e)}
        className="card card-normal border-4 border-base-300 w-full h-fit max-h-full max-w-64 ease-in-out transition-all duration-300 bg-base-100 shadow-black shadow-lg hover:shadow-xl hover:shadow-black flex rounded-lg  cursor-pointer"
      >
        <figure className="w-full h-fit rounded overflow-hidden">
          <img
            src={post.image[0]}
            loading="lazy"
            alt="IMAGE"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => (e.target.src = backupLink)}
            className={`${
              imageLoaded ? "" : "skeleton h-96 w-full"
            } w-full border-b-4 border-base-300`}
          />
        </figure>
        <div className="flex flex-col w-full justify-between px-2 m-1">
          <div className="flex flex-col justify-between">
            <div className="flex flex-row min-w-0 gap-1">
              {category && (
                <span
                  data-tip="Category"
                  className="badge lg:tooltip lg:tooltip-bottom bg-transparent border-transparent badge-xs"
                >
                  {category.categoryName}
                </span>
              )}
              {subCategory && (
                <span
                  data-tip="Sub-Category"
                  className="badge lg:tooltip lg:tooltip-bottom bg-transparent border-transparent badge-xs"
                >
                  {subCategory.subCategoryName}
                </span>
              )}
            </div>
            <h2 className="card-title mt-3 text-2xl max-w-full flex-wrap break-words whitespace-normal min-w-0">
              {post.title}
            </h2>
          </div>

          <div className="flex relative justify-between max-w-full mb-3 mr-3">
            <p className="text-lg">{currencyFormat.format(post.price)}</p>
            <LikeButton
              authUser={authUser}
              postId={post.postId}
              favorites={favorites}
              handleFavorite={handleFavorite}
            />
          </div>

          <PostModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            post={post}
            favorites={favorites}
            categories={categories}
            handleFavorite={handleFavorite}
            authUser={authUser}
          />
        </div>
      </div>
    </div>
  );
}
