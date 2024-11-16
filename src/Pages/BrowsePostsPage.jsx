import {PostCard} from "../Components/PostCard"; // Component for each post
import { FilterComponent } from "../Components/FilterComponent";
import Footer from "../Components/Footer";
import { useLoaderData, useOutletContext } from "react-router-dom"
import { useState } from 'react';

export default function BrowsePostsPage() {
    const { posts } = useLoaderData();
    const { categories, favorites, setFavorites, authUser, navHeight } = useOutletContext(); // Access navHeight
    const [filterOpen, setFilterOpen] = useState(false);

    return (
        <div className="flex min-h-full w-full flex-col items-center">
            <FilterComponent filterOpen={filterOpen} setFilterOpen={setFilterOpen} navHeight={navHeight} />
            <div className="grid w-5/6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-10 gap-5">
                {posts.map(post => (
                    <PostCard 
                        key={post.postId}
                        post={post} 
                        categories={categories} 
                        favorites={favorites}
                        authUser={authUser}
                        setFavorites={setFavorites} 
                    />
                ))}
            </div>
            <Footer />
        </div>
    );
}

