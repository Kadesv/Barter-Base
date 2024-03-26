import { useLoaderData } from "react-router-dom"
import ImageMap from "../Components/ImageMap";
export default function PostDetailPage() {
  const { post } = useLoaderData();

  const { title, context, price, user, createdDate, image } = post;

  return (
    <>
      <div className="grid">
        <div className="card  w-96 bg-base-100 shadow-xl">
          <figure className="px-10 pt-10">
            <div className="w-64 carousel rounded-box">
              <div className="carousel-item w-full">
                <ImageMap images={image} />
              </div>
            </div>
          </figure>
          <div className="card-body flex   ">
            <h2 className="card-title"> {title} </h2>
            <div className="card-actions">
              <a className="btn btn-primary">Message</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}


