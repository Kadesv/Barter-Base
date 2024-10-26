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

    const startResizing = (e) => {
        const initialWidth = figureRef.current.offsetWidth;
        const initialHeight = figureRef.current.offsetHeight;
        const aspectRatio = initialWidth / initialHeight;
        const initialX = e.clientX;
        const initialY = e.clientY;
    
        const onMouseMove = (e) => {
            const deltaX = e.clientX - initialX;
            const deltaY = e.clientY - initialY;
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
                onClick={(e) => onImageClick(e)}
                className="modal-box rounded-2xl object-contain max-w-fit border-10 m-5 border-base-300 overflow-hidden bg-base-200 p-3 relative"
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

                {/* Resize handle */}
                <div
                    className="absolute bottom-0 right-0 cursor-se-resize w-6 h-6"
                    onMouseDown={startResizing}
                ></div>
            </figure>


            <form id={`closeForm${post.postId}component`} method="dialog" className="modal-backdrop">
                <button onClick={() => setViewImage(false)}></button>
            </form>
        </dialog>
    ) : (
        <dialog id={`model-popup${post.postId}`} className="modal shadow-2xl object-contain">
            <div className="modal-box border-4 m-5 border-base-300 shadow-black shadow-lg card card-side">
                <div className="mr-3 flex items-center justify-center bg-transparent">
                    <figure onClick={(e) => onImageClick(e)} className="carousel border-2 border-base-300 rounded-2xl h-fit shadow-black shadow-sm flex items-center bg-transparent">
                        <ImageMap images={post.image} userId={post.userId} user={authUser} />
                    </figure>
                </div>
                <div className="flex flex-col bg-base-200 border-2 border-base-300 rounded-2xl shadow-black shadow-sm p-2">
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
