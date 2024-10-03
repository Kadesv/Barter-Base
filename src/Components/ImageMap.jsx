import { useState } from "react"
export default function ImageMap({ images, userId, user, isEditing, handleDeleteImage}) {
      const [imageLoaded, setImageLoaded] = useState(false)
      
      if (!user) {
            return (
                  images.map((image, index) => {
                        return (
                              <div key={index} className='carousel-item bg-transparent w-full h-full'>
                                    <img src={image} alt="image" onLoad={()=>setImageLoaded(true)}className={`h-full ${imageLoaded ? 'skeleton':'skeleton'} `} />
                              </div>
                        )
                  })
            )
      }
      else {
            return (
                  images.map((image, index) => {
                        return (
                              userId !== user.userId || !isEditing ?
                                    <div key={index} className='carousel-item inline-block bg-transparent w-full h-full min-w-min'>
                                          <img src={image} alt="image" className="w-full " />
                                    </div>

                                    :
                                    
                                    <div key={index} className='carousel-item relative w-full inline-block'>
                                          <img src={image} alt="image" className="w-full" />
                                          <div
                                                className="dropdown dropdown-bottom dropdown-end absolute top-1 right-1 flex content-center">
                                                <p
                                                      className=" text-white bg-gray-900 bg-opacity-50 rounded-btn text-opacity-50 hover:text-opacity-100 "
                                                      tabIndex={0}
                                                      role="button">
                                                      <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24" fill="currentColor"
                                                            className="size-6 ">
                                                            <path fillRule="evenodd"
                                                                  d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                                      </svg>
                                                </p>
                                                <ul tabIndex={0} className="menu menu-sm bg-transparent text-opacity-100 dropdown-content mt-3 z-[1] shadow rounded-box w-">
                                                      <li><button
                                                            className="text-opacity-100 bg-base-100 bg-opacity-75"
                                                            onClick={(e) => handleDeleteImage(e)}>delete</button></li>

                                                </ul>
                                          </div>
                                    </div>

                                    )
                  })
            )
      }
}
