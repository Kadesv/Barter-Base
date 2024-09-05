export default function ImageMap({ images, userId, user }) {

      if (!user) {
            return (
                  images.map((image, index) => {
                        return (
                              <div key={index} className='carousel-item w-full'>
                                    <img src={image} alt="image" className=" w-full" />
                              </div>
                        )
                  })
            )}
      else {
            return (
                  images.map((image, index) => {
                        return (
                              userId !== user.userId ?
                                    <div key={index} className='carousel-item min-w-min'>
                                          <img src={image} alt="image" className="w-full" />
                                    </div>
                                    :
                                    <div key={index} className='carousel-item relative w-full inline-block'>
                                          <img src={image} alt="image" className="block w-full h-auto " />
                                          <button
                                          className="absolute top-1 right-1 text-white bg-transparent p-1 rounded opacity-50 hover:opacity-100">
                                                <svg
                                                      xmlns="http://www.w3.org/2000/svg"
                                                      viewBox="0 0 24 24" fill="currentColor"
                                                      onClick={(e) => handleDelete(e)}
                                                      className="size-5 ">
                                                      <path fillRule="evenodd"
                                                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                                                </svg>
                                          </button>
                                    </div>
                        )
                  })
            )
      }
}
