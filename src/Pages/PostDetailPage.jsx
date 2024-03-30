import { useLoaderData } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
export default function PostDetailPage() {
  const { post } = useLoaderData();

  const { title, context, price, user, createdDate, image } = post;

  return (
    <>


      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center items-center lg:text-left">

            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">{title}</h1>
              <p className="py-6">{context}</p>
            </div>

            <div className="collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-xl font-medium">
                Message Seller
              </div>
              <form className="collapse-content">
                <input className="input" placeholder="Type Here..." />
                <button className="btn">Send</button>
              </form>
            </div>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <figure className="px-10 p-10">
                <div className="w-full carousel rounded-box">
                  <div className="carousel-item w-full">
                    <ImageMap images={image} />
                  </div>
                </div>
              </figure>
            </form>
          </div>
        </div>
      </div>

    </>
  )
}


