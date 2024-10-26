import { useState } from "react";

export default function ImageMap({ images, userId, user, isEditing, handleDeleteImage }) {
      const [imageLoaded, setImageLoaded] = useState(false);

      const handleLoadedImage = (e) => {
            e.preventDefault()
            setImageLoaded(true)
      }

      return images.map((image, index) => {
            const commonImageClass = `select-none h-full object-contain ${imageLoaded ? 'w-fit' : 'skeleton w-full'}`; // Ensures the image is contained, adjusts to the container's width and height

            if (!user) {
                  return (
                        <div key={index} className="carousel-item bg-transparent w-fit h-full flex justify-center items-center overflow-hidden">
                              <img
                                    draggable={false}
                                    src={image}
                                    alt="image"
                                    onLoad={(e) => handleLoadedImage(e)}
                                    className={commonImageClass}
                              />
                        </div>
                  );
            } else {
                  return (
                        userId !== user.userId || !isEditing ? (
                              <div key={index} className="carousel-item bg-transparent w-fit h-full flex justify-center items-center overflow-hidden">
                                    <img
                                          draggable={false}
                                          src={image}
                                          alt="image"
                                          onLoad={(e) => handleLoadedImage(e)}
                                          className={commonImageClass}
                                    />
                              </div>
                        ) : (
                              <div key={index} className="carousel-item relative w-fit h-full flex justify-center items-center overflow-hidden">
                                    <img
                                          draggable={false}
                                          src={image}
                                          alt="image"
                                          onLoad={(e) => handleLoadedImage(e)}
                                          className={commonImageClass}
                                    />
                                    <div className="dropdown dropdown-bottom dropdown-end absolute top-1 right-1">
                                          <p className="text-white bg-gray-900 bg-opacity-50 rounded-btn text-opacity-50 hover:text-opacity-100" tabIndex={0} role="button">
                                                {/* Updated SVG for menu button */}
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      fill="none"
                                                      viewBox="0 0 24 24"
                                                      strokeWidth={1.5}
                                                      stroke="currentColor"
                                                      className="w-6 h-6 text-gray-500"
                                                >
                                                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75c.69 0 1.25-.56 1.25-1.25S12.69 4.25 12 4.25 10.75 4.81 10.75 5.5s.56 1.25 1.25 1.25Zm0 4.5c.69 0 1.25-.56 1.25-1.25S12.69 9.5 12 9.5s-1.25.56-1.25 1.25S11.31 11.25 12 11.25Zm0 4.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25-1.25.56-1.25 1.25.56 1.25 1.25 1.25Z" />
                                                </svg>
                                          </p>
                                          <ul tabIndex={0} className="menu menu-sm bg-transparent text-opacity-100 dropdown-content mt-3 z-[1] shadow rounded-box w-">
                                                <li>
                                                      <button
                                                            className="text-opacity-100 bg-base-100 bg-opacity-75"
                                                            onClick={(e) => handleDeleteImage(e)}
                                                      >
                                                            Delete
                                                      </button>
                                                </li>
                                          </ul>
                                    </div>
                              </div>
                        )
                  );
            }
      });
}
