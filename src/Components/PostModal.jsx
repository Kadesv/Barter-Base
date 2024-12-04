import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";
import { useState, useRef } from "react";
import { MessageSellerForm } from "./MessageSellerForm";

export function PostModal({ post, categories, location, authUser, modalOpen, setModalOpen, handleFavorite, favorites }) {
    const [viewImage, setViewImage] = useState(false);
    const [figureSize, setFigureSize] = useState({ width: "auto", height: "auto" });
    const figureRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
   
    const category = categories?.find((cat) => cat.categoryId === post.categoryId);
    const subCategory = category?.subcategories?.find((sub) => sub.subCategoryId === post.subCategoryId);

    const handleImageLoad = () => setImageLoaded(true);
    
    const handleModalClose = (e)=> {
        e.preventDefault();
        setModalOpen(false);
        setViewImage(false)
    }

    const startResizing = (e, direction) => {
        const initialWidth = figureRef.current.offsetWidth;
        const initialHeight = figureRef.current.offsetHeight;
        const aspectRatio = initialWidth / initialHeight;
        const initialX = e.clientX;
        const initialY = e.clientY;

        const onMouseMove = (e) => {
            let deltaX = e.clientX - initialX;
            let deltaY = e.clientY - initialY;

            if (direction.includes("left")) deltaX = -deltaX;
            if (direction.includes("top")) deltaY = -deltaY;

            const delta = Math.min(deltaX, deltaY);
            const newWidth = Math.max(
                Math.min(initialWidth + delta, window.innerWidth - 40),
                300
            );
            const newHeight = newWidth / aspectRatio;

            setFigureSize({ width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
        };

        window.addEventListener("mousemove", onMouseMove);
        window.addEventListener("mouseup", onMouseUp);
    };

    return viewImage ? (
        <dialog
            id={`model-popup${post.postId}`}
            className="modal shadow-2xl"
            open={modalOpen}
        >
            <figure
                ref={figureRef}
                className="modal-box rounded-sm object-contain max-w-fit min-h-fit border-4 p-0 mx-20 my-10 border-base-300 overflow-visible bg-base-200 relative"
                style={{
                    width: figureSize.width === "auto" ? "fit-content" : `${figureSize.width}px`,
                    height: figureSize.height === "auto" ? "fit-content" : `${figureSize.height}px`,
                }}
            >
                <ImageMap
                    images={post.image?.length ? post.image : ["path/to/default/image.jpg"]}
                    userId={post.userId}
                    handleImageLoad={handleImageLoad}
                    user={authUser}
                />

                {/* Resize handles */}
                <div
                    className="absolute top-0 left-0 cursor-nw-resize rounded-br-full w-6 h-6"
                    onMouseDown={(e) => startResizing(e, "top-left")}
                ></div>
                <div
                    className="absolute top-0 right-0 cursor-ne-resize rounded-bl-full w-6 h-6"
                    onMouseDown={(e) => startResizing(e, "top-right")}
                ></div>
                <div
                    className="absolute bottom-0 left-0 cursor-sw-resize rounded-tr-full w-6 h-6"
                    onMouseDown={(e) => startResizing(e, "bottom-left")}
                ></div>
                <div
                    className="absolute bottom-0 right-0 cursor-se-resize rounded-tl-full w-6 h-6"
                    onMouseDown={(e) => startResizing(e, "bottom-right")}
                ></div>
                <svg
                    onClick={()=>setViewImage(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="hover:scale-105 rounded-full hover:bg-opacity-75 fixed top-0 -right-10 bg-black bg-opacity-50 size-6"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                    />
                </svg>
            </figure>
            <form method="dialog" className="modal-backdrop">
                <button onClick={(e) => handleModalClose(e)}></button>
            </form>
        </dialog>
    ) : (
        <dialog
            open={modalOpen}
            id={`model-popup${post.postId}`}
            className="modal">
            <div className="modal-box border-4 m-3 border-base-300 bg-base-200 shadow-black shadow-lg p-4 card card-side">
                <div className="flex flex-col items-center m-auto justify-center bg-transparent">
                    <figure className="carousel border-2 border-base-300 h-fit relative shadow-black shadow-lg flex items-center bg-transparent">
                        <ImageMap images={post.image?.length ? post.image : ["path/to/default/image.jpg"]} userId={post.userId} user={authUser} />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={()=> setViewImage(true)}
                            fill="currentColor"
                            className="hover:scale-105 hover:bg-opacity-75 absolute bottom-0 right-0 bg-black bg-opacity-50 w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </figure>
                </div>
                <div className="flex flex-col rounded-2xl pl-3">
                    <div className="flex gap-1">
                        <span className="badge border-transparent bg-transparent flex-shrink badge-xs">
                            {category?.categoryName || "Unknown Category"}
                        </span>
                        <span className="badge border-transparent bg-transparent flex-shrink badge-xs">
                            {subCategory?.subCategoryName || "Unknown Subcategory"}
                        </span>
                    </div>
                    <p className="flex text-xl justify-end m-1 mr-2">${post.price}</p>
                    <h1 className="text-5xl font-bold">{post.title}</h1>
                    <p className="py-6">{post.context}</p>
                    <LikeButton postId={post.postId} authUser={authUser} handleFavorite={handleFavorite} favorites={favorites} />
                    <MessageSellerForm post={post} location={location} authUser={authUser} />
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button onClick={(e)=>handleModalClose(e)}></button>
            </form>
        </dialog>
    );
}
