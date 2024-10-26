import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { PostModal } from "./PostModal";
import { useState } from "react";
import axios from "axios";

export function PostCard({ post, categories, favorites, authUser, setFavorites }) {
    const navigate = useNavigate();
    const [isWide] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const backupLink = "https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1a";

    const handleFavorite = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!authUser) {
            navigate('/signIn');
        } else {
            try {
                const res = await axios.post(`/api/posts/favorite/${post.postId}`);
                setFavorites(res.data);
            } catch (error) {
                console.error("Error favoriting post", error);
            }
        }
    };

    const handleImageLoad = (e) => {
        e.preventDefault();
        // console.log(e.target)
        setImageLoaded();
    }

    const showModal = (e) => {
        if (e.target.tagName !== "BUTTON" && e.target.tagName !== "svg") {
            document.getElementById(`model-popup${post.postId}`).showModal();
        }
    };

    return (
        <div className="m-3 flex justify-center w-full ">
            <div
                onClick={showModal}
                className="card card-normal w-5/6 border-4 border-base-300 lg:min-h-96 ease-in-out tems-center transition-all duration-300 bg-base-100 shadow-black shadow-lg hover:shadow-xl hover:shadow-black flex content-between object-contain rounded-lg cursor-pointer"
            >
                <figure className={`justify-center flex w-full h-full rounded overflow-x-clip ${isWide ? '' : ''}`}>
                    <img
                        src={post.image[0]}
                        alt="IMAGE"
                        onLoad={(e) => handleImageLoad(e)}
                        onError={(e) => e.target.src !== backupLink ? e.target.src = backupLink : ''}
                        className={`max-h-full w-full  border-b-4 border-base-300 max-w-full h-full min-h-max rounded-lg ${imageLoaded ? '' : 'skeleton w-full h-full '}`}
                    />
                </figure>

                <div className="flex flex-col w-full justify-between px-2 m-1">
                    <div className="flex flex-col justify-between">
                        <div className="flex flex-row min-w-0 gap-1">
                            <span className="badge border-transparent flex-shrink badge-xs">
                                {categories.find(cat => cat.categoryId === post.categoryId).categoryName}
                            </span>
                            <span className="badge border-transparent flex-shrink badge-xs">
                                {categories.find(cat => cat.categoryId === post.categoryId).subcategories.find(sub => sub.subCategoryId === post.subCategoryId).subCategoryName}
                            </span>
                        </div>
                        <h2 className="card-title mt-3 text-2xl max-w-full flex-wrap break-words whitespace-normal min-w-0">
                            {post.title}
                        </h2>
                    </div>
                    <div className="flex relative justify-between max-w-full mb-3 mx-4">
                        <p className="text-lg">${post.price}</p>
                        <LikeButton authUser={authUser} postId={post.postId} favorites={favorites} handleFavorite={handleFavorite} />
                    </div>

                    <PostModal post={post} favorites={favorites} categories={categories} handleFavorite={handleFavorite} authUser={authUser} />
                </div>
            </div>
        </div>
    );
}
