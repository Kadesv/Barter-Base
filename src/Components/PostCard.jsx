import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { PostModal } from "./PostModal";
import { useState } from "react";
import axios from "axios";

export function PostCard({ post, categories, favorites, authUser, setFavorites }) {
    const navigate = useNavigate();
    const [isWide, setIsWide] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false)
    const backupLink = "https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1a"

    const handleFavorite = async (e) => {
        e.preventDefault();
        if (!authUser) {
            navigate('/signIn');
        } else {
            const res = await axios.post(`/api/posts/favorite/${post.postId}`);
            setFavorites(res.data);
        }
    };

    return (
        <div className="m-3 flex justify-center w-full">
            <div
                onClick={() => document.getElementById(`model-popup${post.postId}`).showModal()}
                className="card card-normal hover:scale-105 w-5/6 lg:min-h-96 items-center ease-in-out duration-300 bg-base-100 shadow-xl flex content-between object-contain rounded-lg">
                <figure
                    className={`flex justify-center w-full h-full rounded overflow-x-clip ${isWide ? '' : 'w-full'}`}
                >
                    <img
                        src={post.image[0]}
                        alt="IMAGE"
                        onLoad={() => setImageLoaded(true)}
                        onError={(e) => e.target.src !== backupLink ? e.target.src = backupLink : ''}
                        className={`max-h-full w-full max-w-full p-1 min-h-max rounded-lg ${imageLoaded ? '': 'skeleton w-full h-full'}`}
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
                        <h2 className={"card-title mt-3 text-2xl max-w-full flex-wrap break-words whitespace-normal min-w-0"}> {/* Add min-w-0 here */}
                            {post.title}
                        </h2>
                    </div>
                    <div className="flex justify-between max-w-full mb-3 mx-4">
                        <p className="text-lg">${post.price}</p>
                        <LikeButton authUser={authUser} postId={post.postId} favorites={favorites} handleFavorite={handleFavorite} />
                    </div>

                    <PostModal post={post} categories={categories} />
                </div>
            </div>
        </div>
    );
}
