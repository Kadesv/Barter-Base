import { lazy, Suspense, useState } from 'react';
import { useQuery } from 'react-query';
import { useOutletContext } from "react-router-dom";
import axios from 'axios';
import FilterComponent from '../Components/FilterComponent';

const PostCard = lazy(async () => {
    return import("../Components/PostCard");
});

function usePosts() {
    return useQuery('posts', async () => {
        const res = await axios.get('/api/posts/browse');
        return res.data.posts;
    });
}

export default function BrowsePostsPage() {
    const { data: posts = [], isLoading } = usePosts();
    const { categories, favorites, setFavorites, authUser, navHeight, updateNavHeight } = useOutletContext();
    const [filterOpen, setFilterOpen] = useState(false);

    const filterClickHandler = (e)=> {
        e.preventDefault()
        setFilterOpen(!filterOpen)
    }

    if (!Array.isArray(posts)) {
        console.error("Invalid posts data:", posts);
        return <div>Error loading posts.</div>;
    }

    if (isLoading) return <div>Loading posts...</div>;

    return (
        <div className="flex flex-col items-center ">
            <FilterComponent filterOpen={filterOpen} setFilterOpen={setFilterOpen} filterClickHandler={filterClickHandler}navHeight={navHeight} updateNavHeight={updateNavHeight} />
            <div className="grid w-2/3 md:w-5/6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 mb-10 gap-5">
                <Suspense fallback={<div>Loading post...</div>}>
                    {posts
                        .filter(post => post && post.postId)
                        .map((post) => (
                            
                            <PostCard
                                key={post.postId}
                                post={post}
                                categories={categories}
                                favorites={favorites}
                                authUser={authUser}
                                setFavorites={setFavorites}
                            />
                        ))}

                </Suspense>

            </div>
        </div>
    );
}
