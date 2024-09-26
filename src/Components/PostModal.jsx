import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";
import { useState } from "react";
import { MessageSellerForm } from "./MessageSellerForm";
export function PostModal({ post, categories, authUser }) {
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
            <dialog id={`model-popup${post.postId}`} className="modal shadow-2xl">
                    <figure onClick={(e) => onImageClick(e)} className=" carousel modal-box w-fit rounded-2xl overflow-visible scale-150 bg-base-200 p-3 max-h-96 max-w-2xl">
                        <ImageMap images={post.image} userId={post.user.userId} setIsWide={setIsWide} handleImageLoad={handleImageLoad} user={authUser} />
                    </figure>
                
                <form id={'closeForm' + post.postId + 'component'} method="dialog" className="modal-backdrop">
                    <button onClick={()=>setViewImage(false)}></button>
                </form>
            </dialog>
            :
            <dialog id={`model-popup${post.postId}`} className="modal shadow-2xl">
                <div className="modal-box card card-side ">
                <div className="mr-3 bg-transparent">
                        <figure onClick={(e) => onImageClick(e)} className="carousel flex items-center bg-transparent ">
                            <ImageMap images={post.image} userId={post.user.userId} user={authUser} />
                        </figure>
                    </div>
                    <div className="flex flex-col ">
                        <h2 className="flex justify-end">${post.price}</h2>
                        <h1 className="text-5xl font-bold ">{post.title}</h1>
                        <p className="py-6">{post.context}</p>
                        <LikeButton postId={post.postId} authUser={authUser} />
                        <MessageSellerForm post={post} />
                    </div>
                    
                </div>
                <form id={'closeForm' + post.postId + 'component'} method="dialog" className="modal-backdrop">
                    <button></button>
                </form>
            </dialog>
    );
}