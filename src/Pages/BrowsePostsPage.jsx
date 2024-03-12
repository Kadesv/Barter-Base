import { useLoaderData } from "react-router-dom"

export default function BrowsePostsPage() {
  const { posts } = useLoaderData();

  const handleNewPost = async (event, formData) => {
    event.preventDefault();

    const res = await axios.post('/api/post/new', formData);

    if (res.data.success) {
      handleClose();
      navigate('/');
    } 
    else{
      console.log('bad news')
    }
  };

// console.log(posts)
  const postListItems = posts.map(({ user, postId, title, context, createdDate, price }) => 
    (
      <div key={postId}>
        <p>{title}</p>
        <p>{price}</p>
        <p>{context}</p>
        <p>{user.username}</p>
        <p>{createdDate}</p>
      </div>
    )
  );

  return (
    <>
<div className="card w-96 bg-base-100 shadow-xl">
  <figure className="px-10 pt-10">
    <img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Shoes!</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div className="card-actions">
      <button className="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
    <h1>Browser</h1>
      {postListItems}
    </>
  )
}