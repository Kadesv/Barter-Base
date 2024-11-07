import { useState } from 'react';

export default function TabComponent({ onFavoriteClick, onNewPostClick, onChatClick}) {
    const [activeTab, setActiveTab] = useState('Favorites');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === 'Favorites') onFavoriteClick();
        if (tab === 'NewPost') onNewPostClick();
        if (tab === 'Chats') onChatClick();
    };

    return (
        <div className="relative">
            {/* Tab Headers with Sliding Indicator */}
            <div className="tabs tabs-bordered relative">
                <button
                    onClick={() => handleTabClick('Favorites')}
                    className='tab text-gray-50'
                >
                    Favorites
                </button>
                <button
                    onClick={() => handleTabClick('NewPost')}
                    className='tab text-gray-50'
                >
                    New Post
                </button>
                <button
                    onClick={() => handleTabClick('Chats')}
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
                {activeTab === 'Favorites' && <div className="fade-in"></div>}
                {activeTab === 'NewPost' && <div className="fade-in"></div>}
                {activeTab === 'Chats' && <div className="fade-in"></div>}
            </div>
        </div>
    );
}
