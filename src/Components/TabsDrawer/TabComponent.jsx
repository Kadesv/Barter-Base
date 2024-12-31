import NewPostForm from './NewPostForm.jsx';
import ChatRoomList from './ChatRoomList.jsx';
import NoSignAlert from './NoSignAlert.jsx';
import FavoritesComponent from './FavoritesComponent.jsx';

export default function TabComponent({ props:{activeTab, setActiveTab, onTabClick, setFavorites, favorites, authUser, setShowDrawer, chatRooms, categories} }) {

    return (
        <div className="relative w-full">
            {/* Tab Headers with Sliding Indicator */}
            <div className="tabs tabs-bordered relative w-full">
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
                    className="absolute bottom-0 bg-gray-50 transition-all duration-300 ease-in-out"
                    style={{
                        height:`2px`,
                        width: `calc(${100 / 3}% + 4px)`,
                        transform: `translateX(calc(${activeTab === 'Favorites' ? 0 : activeTab === 'NewPost' ? 100 : 200}% - 2px))`,
                    }}
                />
            </div>

            {/* Tab Content with Fade Animation */}
            <div className="mt-4 transition-opacity duration-300 w-full ease-in-out">
                {activeTab === 'Favorites' && <div className="fade-in">
                    <FavoritesComponent props={{authUser, setFavorites, favorites, categories}} />
                </div>}
                {activeTab === 'NewPost' && authUser && <div className="fade-in">
                    <NewPostForm props={{categories, authUser, setActiveTab, setShowDrawer}} />
                </div>}
                {activeTab === 'Chats' && <div className="fade-in">
                    <ChatRoomList props={{chatRooms, authUser}} />
                </div>}
                {!authUser && <div className="fade-in">
                    <NoSignAlert />
                </div>}
            </div>
        </div>
    );
}
