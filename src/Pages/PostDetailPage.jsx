import { useLoaderData } from "react-router-dom"

export default function PostDetailPage() {
  const {post} = useLoaderData();
  
  const {title, context, price, user, createdDate } = post;
  console.log(post)
  return (
    <>
        <div  className="grid">
      <div className="card  w-96 bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src="https://picsum.photos/300" alt="image" className="rounded-xl" />
        </figure>
        <div className="card-body flex   ">
          <h2 className="card-title"> {title} </h2>
          <div className="card-actions">
            <a className="btn btn-primary" >Message</a>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}