import { useLoaderData } from "react-router-dom"

export default function BrowsePostsPage() {
  const { posts } = useLoaderData();

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
    <h1>Browser</h1>
      {postListItems}
    </>
  )
}