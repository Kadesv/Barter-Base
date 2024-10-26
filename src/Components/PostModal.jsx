import LikeButton from "./LikeButton";
import ImageMap from "./ImageMap";
import { useState, useRef } from "react";
import { MessageSellerForm } from "./MessageSellerForm";

export function PostModal({ post, categories, location, authUser, handleFavorite, favorites }) {
    const [viewImage, setViewImage] = useState(false);
    const [isWide, setIsWide] = useState(false);

    const [figureSize, setFigureSize] = useState({ width: 'auto', height: 'auto' });
    const figureRef = useRef(null); // Reference for resizing the figure

    const handleImageLoad = (event) => {
        const img = event.target;
        if (img.naturalWidth > img.naturalHeight) {
            setIsWide(true);
        }
    };
    const onImageClick = (e) => {
        e.preventDefault();
        setViewImage(!viewImage);
    };
    const startResizing = (e, direction) => {
        const initialWidth = figureRef.current.offsetWidth;
        const initialHeight = figureRef.current.offsetHeight;
        const aspectRatio = initialWidth / initialHeight;
        const initialX = e.clientX;
        const initialY = e.clientY;

        const onMouseMove = (e) => {
            let deltaX = e.clientX - initialX;
            let deltaY = e.clientY - initialY;

            if (direction.includes('right')) {
                // Right edge or corner resizing
                deltaX = e.clientX - initialX;
            } else if (direction.includes('left')) {
                // Left edge or corner resizing
                deltaX = initialX - e.clientX;
            }

            if (direction.includes('bottom')) {
                // Bottom edge or corner resizing
                deltaY = e.clientY - initialY;
            } else if (direction.includes('top')) {
                // Top edge or corner resizing
                deltaY = initialY - e.clientY;
            }

            // Apply the minimum delta between X and Y
            const delta = Math.min(deltaX, deltaY);

            let newWidth = initialWidth + delta;
            let newHeight = initialHeight + delta / aspectRatio;

            const maxWidth = window.innerWidth - 40;
            const maxHeight = window.innerHeight - 40;
            const minWidth = 300;
            const minHeight = minWidth / aspectRatio;

            if (newWidth < minWidth) {
                newWidth = minWidth;
                newHeight = newWidth / aspectRatio;
            }
            if (newHeight < minHeight) {
                newHeight = minHeight;
                newWidth = newHeight * aspectRatio;
            }
            if (newWidth > maxWidth) {
                newWidth = maxWidth;
                newHeight = newWidth / aspectRatio;
            }
            if (newHeight > maxHeight) {
                newHeight = maxHeight;
                newWidth = newHeight * aspectRatio;
            }

            setFigureSize({ width: newWidth, height: newHeight });
        };

        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        // Attach events to the window to capture movements and release globally
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    };

    return viewImage ? (
        <dialog
            id={`model-popup${post.postId}`}
            className="modal shadow-2xl"
        >
            <figure
                ref={figureRef}
                className="modal-box rounded-sm object-contain max-w-fit max-h-fit border-4 p-0 m-10 border-base-300 overflow-hidden bg-base-200 relative"
                style={{
                    width: figureSize.width === 'auto' ? 'fit-content' : `${figureSize.width}px`,
                    height: figureSize.height === 'auto' ? 'fit-content' : `${figureSize.height}px`
                }}
            >
                <ImageMap
                    images={post.image}
                    userId={post.userId}
                    setIsWide={setIsWide}
                    handleImageLoad={handleImageLoad}
                    user={authUser}
                />

                {/* Resize handles for all corners */}
                <div
                    className="absolute top-0 left-0 cursor-nw-resize w-4 h-4"
                    onMouseDown={(e) => startResizing(e, 'top-left')}
                ></div>
                <div
                    className="absolute top-0 right-0 cursor-ne-resize w-4 h-4"
                    onMouseDown={(e) => startResizing(e, 'top-right')}
                ></div>
                <div
                    className="absolute bottom-0 left-0 cursor-sw-resize w-4 h-4"
                    onMouseDown={(e) => startResizing(e, 'bottom-left')}
                ></div>
                <div
                    className="absolute bottom-0 right-0 cursor-se-resize w-4 h-4"
                    onMouseDown={(e) => startResizing(e, 'bottom-right')}
                ></div>
                <svg
                    onClick={(e) => onImageClick(e)}
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="hover:scale-105 rounded-full hover:bg-opacity-75 fixed right-1 bottom-1 bg-black bg-opacity-50  size-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </figure>

            <form id={`closeForm${post.postId}component`} method="dialog" className="modal-backdrop">
                <button onClick={() => setViewImage(false)}></button>
            </form>
        </dialog>
    ) : (
        <dialog id={`model-popup${post.postId}`} className="modal">
            <div className="modal-box border-4 m-5 border-base-300 shadow-black shadow-lg card card-side">
                <div className="mr-3 flex flex-col items-center justify-center bg-transparent">
                    <figure className="carousel border-2 border-base-300 h-fit relative shadow-black shadow-lg flex items-center  bg-transparent">
                        <ImageMap images={post.image} userId={post.userId} user={authUser} />

                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            onClick={(e) => onImageClick(e)}
                            fill="currentColor"
                            className="hover:scale-105 hover:bg-opacity-75 absolute bottom-0 right-0 bg-black bg-opacity-50 w-6 h-6"
                        >
                            <path fillRule="evenodd" d="M15 3.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V5.56l-3.97 3.97a.75.75 0 1 1-1.06-1.06l3.97-3.97h-2.69a.75.75 0 0 1-.75-.75Zm-12 0A.75.75 0 0 1 3.75 3h4.5a.75.75 0 0 1 0 1.5H5.56l3.97 3.97a.75.75 0 0 1-1.06 1.06L4.5 5.56v2.69a.75.75 0 0 1-1.5 0v-4.5Zm11.47 11.78a.75.75 0 1 1 1.06-1.06l3.97 3.97v-2.69a.75.75 0 0 1 1.5 0v4.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5h2.69l-3.97-3.97Zm-4.94-1.06a.75.75 0 0 1 0 1.06L5.56 19.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 1.5 0v2.69l3.97-3.97a.75.75 0 0 1 1.06 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </figure>
                </div>

                <div className="flex flex-col bg-base-200 border-2 border-base-300 rounded-2xl shadow-black shadow-lg p-2">
                    <div className="flex flex-row min-w-0 gap-1">
                        <span className="badge border-transparent bg-transparent flex-shrink badge-xs">
                            {categories.find(cat => cat.categoryId === post.categoryId).categoryName}
                        </span>
                        <span className="badge border-transparent bg-transparent flex-shrink badge-xs">
                            {categories.find(cat => cat.categoryId === post.categoryId).subcategories.find(sub => sub.subCategoryId === post.subCategoryId).subCategoryName}
                        </span>
                    </div>
                    <p className="flex text-xl justify-end m-1 mr-2">${post.price}</p>
                    <h1 className="text-5xl font-bold">{post.title}</h1>
                    <p className="py-6">{post.context}</p>
                    <LikeButton postId={post.postId} authUser={authUser} handleFavorite={handleFavorite} favorites={favorites} />
                    <MessageSellerForm post={post} location={location} authUser={authUser} />
                </div>
            </div>

            <form id={`closeForm${post.postId}component`} method="dialog" className="modal-backdrop">
                <button></button>
            </form>
        </dialog>

    );
}