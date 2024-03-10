import { useLoaderData } from "react-router-dom"
export default function AccountPage() {
const {posts, favorites} = useLoaderData();
  return (
    <>
        <h1>account page</h1>

    </>
  )
}