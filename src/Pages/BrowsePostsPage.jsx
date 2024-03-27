  import { useLoaderData, useOutletContext } from "react-router-dom"
export default function BrowsePostsPage() {
  const {posts} = useLoaderData();

  const categories= useOutletContext();
  // console.log(categories, 'child');

  const handleNewPost = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/post/new', formData);

    if (res.data.success) {
      handleClose();
      navigate('/');
    }
    else {
      console.log('bad news')
    }
  };

  const postListItems = posts.map(({ image, user, postId, title, context, createdDate, price }) =>
  
  (
    <div key={postId} className="grid">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={`${image}`} alt="image" className="rounded-xl" />
        </figure>
        <div className="card-body flex   ">
          <h2 className="card-title">${price} {title} </h2>

          <div className="card-actions">
          {postId}
            <a className="btn btn-primary" href={`/posts/${postId}`}>Read more</a>
            <p>{createdDate}</p>

          </div>
        </div>
      </div>
    </div>
  )
  );
  const filterComponent = () => {
    return(
      filterOpen ?
      <>
      <div className="drawer"> filterComponent</div>
      </>
      :
      <>
      </>
    )
  }

  return (
    <>
    <div className="grid lg:grid-cols-3 gap-20  sm:grid-cols-2">
      {postListItems}

      </div>
    </>
  )
}