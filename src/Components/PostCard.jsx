import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";
import { PostModal } from "./PostModal";
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
        <div className=" h-80 mb-24">
            <div className="card card-compact bg-base-100 shadow-2xl m-1 pt-4">
                <figure onClick={() => document.getElementById(`model-popup${post.postId}`).showModal()} className="h-1/2 w-full rounded mt-2">
                    <img src={post.image[0]} alt="IMAGE NOT FOUND" className="rounded h-auto w-4/5" />
                </figure>
                <div className="card-body">
                    {/* Category and Subcategory */}
                    <div>
                        <span className="badge">
                            {categories.find(cat => cat.categoryId === post.categoryId).categoryName}
                        </span>
                        <span className="badge">
                            {categories.find(cat => cat.categoryId === post.categoryId)
                                .subcategories.find(sub => sub.subCategoryId === post.subCategoryId).subCategoryName}
                        </span>
                    </div>

                    <h2 className="card-title">{post.title}</h2>
                    <div className="flex">
                        <p>${post.price}</p>
                        <LikeButton authUser={authUser} postId={post.postId} favorites={favorites} handleFavorite={handleFavorite} />
                    </div>

                    <PostModal post={post} categories={categories} />
                </div>
            </div>
        </div>
    );
}
