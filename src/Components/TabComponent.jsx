import NewPostForm from './NewPostForm.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import NoSignAlert from './NoSignAlert';
import FavoritesComponent from './FavoritesComponent.jsx';

export default function TabComponent({ activeTab, setActiveTab, onTabClick, setFavorites, favorites, authUser, setShowDrawer, chatRooms, categories }) {

    return (
        <div className="relative w-full">
            {/* Tab Headers with Sliding Indicator */}
            <div className="tabs tabs-bordered relative max-w-full">
                <button
                    onClick={() => onTabClick('Favorites')}
                    className='tab text-gray-50'
                >
                    Favorites
                </button>
                <button
                    onClick={() => onTabClick('NewPost')}
                    className='tab text-gray-50'
                >
                    New Post
                </button>
                <button
                    onClick={() => onTabClick('Chats')}
                    className='tab text-gray-50'
                >
                    Chats
                </button>

                {/* Sliding Indicator */}
                <div
                    className="absolute bottom-0 h-px bg-gray-50 transition-all duration-300 ease-in-out"
                    style={{
                        width: `calc(${100 / 3}% + 16px)`,  // Adds 16px to span beyond the tab's width
                        transform: `translateX(calc(${activeTab === 'Favorites' ? 0 : activeTab === 'NewPost' ? 100 : 200}% - 8px))`,
                    }}
                />
            </div>

            {/* Tab Content with Fade Animation */}
            <div className="mt-4 transition-opacity duration-300 ease-in-out">
                {activeTab === 'Favorites' && <div className="fade-in">
                    <FavoritesComponent authUser={authUser} setFavorites={setFavorites} favorites={favorites} categories={categories} />
                </div>}
                {activeTab === 'NewPost' && <div className="fade-in">
                    <NewPostForm categories={categories} authUser={authUser} setActiveTab={setActiveTab} setShowDrawer={setShowDrawer} />
                </div>}
                {activeTab === 'Chats' && <div className="fade-in">
                    <ChatRoomList chatRooms={chatRooms} user={authUser} />
                </div>}
                {!authUser && <div className="fade-in">
                    <NoSignAlert />
                </div>}
            </div>
        </div>
    );
}
