import { useNavigate } from 'react-router-dom';
import LikeButton from './LikeButton';
import { PostModal } from './PostModal';
import { useState } from 'react';
import axios from 'axios';
const currencyFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
});
export function PostCard({ post, categories, favorites, authUser, setFavorites }) {
    const navigate = useNavigate();
    const [isWide, setIsWide] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const backupLink = 'https://firebasestorage.googleapis.com/v0/b/mytradingproject-6.appspot.com/o/posts%2FYour%20paragraph%20text%20(1).png?alt=media&token=776ac434-702f-456a-b0f0-15eb6f388e1a';

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
                console.error('Error favoriting post', error);
            }
        }
    };

    const handleImageLoad = (e) => {
        e.preventDefault();
        setImageLoaded(true);
        const img = e.target
        console.log(e)
        if (img.naturalHeight < img.naturalWidth) {
            setIsWide(true);
        }
    }

    const showModal = (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'svg') {
            document.getElementById(`model-popup${post.postId}`).showModal();
        }
    };

    return (
        <div className='m-3 flex h-full w-full justify-center '
        >
            <div
                onClick={showModal}
                className='card card-normal border-4 border-base-300 w-full h-fit ease-in-out transition-all duration-300 bg-base-100 shadow-black shadow-lg hover:shadow-xl hover:shadow-black flex rounded-lg cursor-pointer'
            >
                <figure className={`w-full h-fit rounded overflow-hidden  `}>
                    <img
                        src={post.image[0]}
                        alt='IMAGE'
                        draggable={false}
                        onLoad={(e) => handleImageLoad(e)}
                        onError={(e) => e.target.src !== backupLink ? e.target.src = backupLink : ''}
                        className={`${imageLoaded ? '' : 'skeleton h-full'} w-full border-b-4 border-base-300`}
                    />
                </figure>
            
                <div className='flex flex-col w-full justify-between px-2 m-1'>
                    <div className='flex flex-col justify-between'>
                        <div className='flex flex-row min-w-0 gap-1'>
                            <span className='badge bg-transparent border-transparent badge-xs'>
                                {categories.find(cat => cat.categoryId === post.categoryId).categoryName}
                            </span>
                            <span className='badge bg-transparent border-transparent badge-xs'>
                                {categories.find(cat => cat.categoryId === post.categoryId).subcategories.find(sub => sub.subCategoryId === post.subCategoryId).subCategoryName}
                            </span>
                        </div>
                        <h2 className='card-title mt-3 text-2xl max-w-full flex-wrap break-words whitespace-normal min-w-0'>
                            {post.title}
                        </h2>
                    </div>

                    <div className='flex relative justify-between max-w-full mb-3 mr-3'>
                        <p className='text-lg'>{currencyFormat.format(post.price)}</p>
                        <LikeButton authUser={authUser} postId={post.postId} favorites={favorites} handleFavorite={handleFavorite} />
                    </div>

                    <PostModal post={post} favorites={favorites} categories={categories} handleFavorite={handleFavorite} authUser={authUser} />
                </div>
            </div>
        </div>
    );
}
