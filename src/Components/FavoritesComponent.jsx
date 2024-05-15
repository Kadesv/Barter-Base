import axios from "axios";
import { useEffect, useState } from "react";

export default function FavoritesComponent({favorites}) {
  console.log(favorites)
const favMap = favorites.map(({favoritesId})=>{ 
<div key={favoritesId}>
<p>{favoritesId}</p>
</div>
})

  return (
    <>
      <div className='w-full'>
        <section>
          <h1 className="flex justify-center text-xl p-4">Favorites</h1>
          {favMap}
          <p>postId map</p>
          <div className=" grid lg:grid-cols-3 gap-20  sm:grid-cols-2">
          </div>
        </section>
      </div>
    </>
  )
}