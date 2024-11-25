import { useState } from "react";

export default function ImageMap({ images = [], userId, user, isEditing, handleDeleteImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLoadedImage = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  function renderImage(image, index, commonImageClass) {
    return (
      <img
        draggable={false}
        src={image}
        alt="image"
        onLoad={() => handleLoadedImage(index)}
        onError={(e) => (e.target.src = '/path-to-fallback-image.jpg')}
        className={commonImageClass}
      />
    );
  }

  function renderDeleteOption(index) {
    return (
      <div className="dropdown dropdown-bottom dropdown-end absolute top-1 right-1">
        <p className="bg-gray-900 bg-opacity-50 rounded-btn" tabIndex={0} role="button">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.75c.69 0 1.25-.56 1.25-1.25S12.69 4.25 12 4.25 10.75 4.81 10.75 5.5s.56 1.25 1.25 1.25Zm0 4.5c.69 0 1.25-.56 1.25-1.25S12.69 9.5 12 9.5s-1.25.56-1.25 1.25S11.31 11.25 12 11.25Zm0 4.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25Z"
            />
          </svg>
        </p>
        <ul tabIndex={0} className="menu menu-sm bg-transparent text-opacity-100 dropdown-content mt-3 z-[1] shadow rounded-box">
          <li>
            <button className="text-opacity-100 bg-base-100" onClick={(e) => handleDeleteImage(e, index)}>
              Delete
            </button>
          </li>
        </ul>
      </div>
    );
  }

  // Guard clause for empty or invalid images array
  if (!Array.isArray(images) || images.length === 0) {
    return ;
  }

  // Main render
  return images.map((image, index) => {
    const isLoaded = imageLoaded[index];
    const commonImageClass = `select-none h-full object-contain ${isLoaded ? 'w-fit' : 'skeleton w-full'}`;

    return (
      <div key={image} className="carousel-item relative w-fit h-full flex justify-center items-center overflow-hidden">
        {renderImage(image, index, commonImageClass)}
        {user && userId === user.userId && isEditing && renderDeleteOption(index)}
      </div>
    );
  });
}
