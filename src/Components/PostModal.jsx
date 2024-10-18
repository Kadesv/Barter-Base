import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";
import { useState } from "react";
import { MessageSellerForm } from "./MessageSellerForm";
export function PostModal({ post, categories, location, authUser, handleFavorite, favorites }) {
    const [viewImage, setViewImage] = useState(false)
    const [isWide, setIsWide] = useState(false)
    const handleImageLoad = (event) => {
        const img = event.target;
        if (img.naturalWidth > img.naturalHeight) {
            setIsWide(true);
        }
    };
    const onImageClick = (e) => {
        e.preventDefault()
        setViewImage(!viewImage)
    }
    return (
        viewImage ?
            <dialog id={`model-popup${post.postId}`} className="modal border-10 m-5 border-base-300  shadow-2xl">
                <figure onClick={(e) => onImageClick(e)} className=" carousel modal-box  w-fit max-w-2xl scale-150 rounded-2xl h-full object-contain  bg-base-200 p-3 max-h-96 ">
                    <ImageMap images={post.image} userId={post.userId} setIsWide={setIsWide} handleImageLoad={handleImageLoad} user={authUser} />
                </figure>

                <form id={'closeForm' + post.postId + 'component'} method="dialog" className="modal-backdrop">
                    <button onClick={() => setViewImage(false)}></button>
                </form>
            </dialog>
            :
            <dialog id={`model-popup${post.postId}`} className="modal shadow-2xl object-contain">
                <div className="modal-box border-4 m-5 border-base-300 shadow-black shadow-lg card card-side ">
                    <div className="mr-3 flex content-center justify-center bg-transparent">
                        <figure onClick={(e) => onImageClick(e)} className="carousel border-2 border-base-300 rounded-2xl shadow-black shadow-sm flex items-center bg-transparent ">
                            <ImageMap images={post.image} userId={post.userId} user={authUser} />
                        </figure>
                    </div>
                    <div className="flex flex-col bg-base-200  border-2 border-base-300 rounded-2xl shadow-black shadow-sm p-2">
                        <p className="flex text-xl justify-end m-1 mr-2">${post.price}</p>
                        <h1 className="text-5xl font-bold ">{post.title}</h1>
                        <p className="py-6">{post.context}</p>
                        <LikeButton postId={post.postId} authUser={authUser} handleFavorite={handleFavorite} favorites={favorites} />
                        <MessageSellerForm post={post} location={location} authUser={authUser} />
                    </div>

                </div>
                <form id={'closeForm' + post.postId + 'component'} method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
    );
}