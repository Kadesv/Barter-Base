import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";
import { MessageSellerForm } from "./MessageSellerForm";
export function PostModal({ post, categories, authUser }) {
    return (
        <dialog id={`model-popup${post.postId}`} className="modal shadow-2xl">
            <div className="modal-box card card-side ">
                <div className="flex flex-col ">
                    <h2 className="flex justify-end">${post.price}</h2>
                    <h1 className="text-5xl font-bold ">{post.title}</h1>
                    <p className="py-6">{post.context}</p>
                    <LikeButton postId={post.postId} authUser={authUser} />
                    <MessageSellerForm post={post} />
                </div>
                <div className="ml-3 bg-base-100">
                    <figure className=" carousel bg-transparent rounded-box">
                        <ImageMap images={post.image} userId={post.user.userId} user={authUser} />
                    </figure>
                </div>
            </div>
            <form id={'closeForm' + post.postId + 'component'} method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}