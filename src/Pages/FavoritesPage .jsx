import axios from "axios";
import { useEffect, useState } from "react";

export default function FavoritesPage() {

  const [user, setUser] = useState({ email: '', firstName: '', lastName: '', userId: '' })
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    const showUserInfo = async () => {
      const res = await axios.post('/api/checkss');
      if (res.data.success) {
        const user = res.data.user;
        setUser(user);
      }
    };
    showUserInfo();
  }, [])

  // user favorites
  useEffect(() => {
    const showUserFavorites = async () => {
      const res = await axios.get('/api/posts/account');
      // console.log(res.data);
      if (res.data.success) {
        setFavorites(res.data.favorites);
        // console.log("here are the user's favorites", favorites)
      } else {
        // console.log("DB query failed")
      }
    };
    showUserFavorites();
  }, [])

  const userFavorites = favorites.map(({ image, user, postId, title, context, createdDate, price }) =>

  (
    <div key={postId} className="grid">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={`${image}`} alt="image" className=" h-full w-full rounded-xl" />
        </figure>
        <div className="card-body flex   ">
          <h2 className="card-title">{title}</h2>
          <div className="card-actions">
            <a className="btn btn-primary" href={`/posts/${postId}`}>Read more</a>
          </div>
        </div>
      </div>
    </div>
  )
  );

  return (
    <>
      <div className='w-full'>
        <section>
          <h1 className="flex justify-center text-xl p-4">Favorites</h1>
          <div className=" grid lg:grid-cols-3 gap-20  sm:grid-cols-2">
            {userFavorites}
          </div>
        </section>
      </div>
    </>
  )
}