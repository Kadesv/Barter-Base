import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { PostModal } from "./PostModal";
import axios from "axios";
export function PostCard({ post, categories, favorites, authUser, setFavorites }) {
    const navigate = useNavigate();

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
        <div className="m-3 flex justify-center ">
            <div className="card card-normal lg:card-side lg:max-h-80 lg:min-h-44 bg-base-100 shadow-xl flex content-between max-w-full w-2/3 lg:w-full object-contain rounded-lg ">
                <figure
                    onClick={() => document.getElementById(`model-popup${post.postId}`).showModal()}
                    className="flex w-full justify-center p-3 lg:p-0.5 items-center h-full rounded lg:w-1/2 overflow-hidden"
                >
                    <img
                        src={post.image[0]}
                        alt="IMAGE"
                        onError={(e) => e.target.src = 'https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1ahttps://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=7a1ce6ab-0fe6-4c83-bf67-f60be6be4d55'}
                        className=' max-h-full max-w-full h-full rounded'
                    />
                </figure>

                <div className="flex flex-col max-w-full justify-between m-3">
                    {/* Category and Subcategory */}
                <div className="flex flex-col justify-between">
                    <div className="flex flex-row gap-1">

                        <span className="badge border-transparent flex-shrink badge-xs">
                            {categories.find(cat => cat.categoryId === post.categoryId).categoryName}
                        </span>
                        <span className="badge border-transparent flex-shrink badge-xs">
                            {categories.find(cat => cat.categoryId === post.categoryId).subcategories.find(sub => sub.subCategoryId === post.subCategoryId).subCategoryName}
                        </span>
                    </div>
                    <h2 className="card-title mt-3 text-2xl ">{post.title}</h2>
                </div>
                    <div className="flex justify-between max-w-full mx-4">
                        <p className="text-sm">${post.price}</p>
                        <LikeButton authUser={authUser} postId={post.postId} favorites={favorites} handleFavorite={handleFavorite} />
                    </div>

                    <PostModal post={post} categories={categories} />
                </div>
            </div>
        </div>

    );
}
