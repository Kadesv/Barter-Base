export default function ChatRoomList({ chatRooms, user }) {

    const handleDelete = (e) => {
        e.preventDefault();
    }

    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className=" bg-base-100 my-1 w-4/5 rounded-xl ">
                <div className="btn btn-ghost btn-sm justify-between card-title   ">
                    <a className="flex flex-grow" href={`/chats/${chatId}`}>{user.userId === user1Id ? user2Name : user1Name}</a>
                    <div
                        className="dropdown flex content-center">
                        <button
                            className=" text-white rounded bg-transparent opacity-50 hover:opacity-100 max-w-min rounded-xs bg-base-100 "
                            tabIndex={0}
                            role="button">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24" fill="currentColor"
                                className="size-6  ">
                                <path fillRule="evenodd"
                                    d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm bg-base-200 dropdown-content mt-3 z-[1]  shadow bg-base-100 rounded-box w-">
                            <li><button 
                                onClick={(e) => handleDelete(e)}>delete</button></li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    })
    return (
        <>
            {roomsMap}
        </>
    )
}

// <article className="dropdown">
// <button tabIndex={0} role="button" className="btn btn-ghost btn-circle">
//   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
// </button>

// <ul tabIndex={0} className="menu menu-sm bg-base-200 dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
//   <li><a href='/'>Homepage</a></li>
//   <li><AccountLink /></li>
//   <li><a href='/favorites'>Favorites</a></li>
//   <LogButton handleLogOut={(e) => handleLogout(e)} authUser={authUser} />
//   {/* <li><a href='/about'>About</a></li> */}
// </ul>
// </article>