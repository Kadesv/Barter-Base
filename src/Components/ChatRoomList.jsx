export default function ChatRoomList({ chatRooms, user }) {

    const handleDelete = (e) => {
        e.preventDefault();
            
    }

    return(chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className=" bg-base-300 my-1 w-4/5 rounded-xl ">
                <div className="btn btn-ghost btn-sm justify-between card-title   ">
                    <a className="flex flex-grow" href={`/chats/${chatId}`}>{user.userId === user1Id ? user2Name : user1Name}</a>
                    <div
                        className="dropdown flex content-center dropdown-bottom dropdown-end">
                        <button
                            className=" text-white bg-transparent opacity-50 hover:opacity-100 max-w-min rounded-xs bg-base-100 "
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
                        <ul tabIndex={0} className=" bg-transparent dropdown-content p-0 z-[1]  mt-3 shadow  rounded-box ">
                            <li><p 
                                onClick={(e) => handleDelete(e)}>delete</p></li>

                        </ul>
                    </div>
                </div>
            </div>
        )
    }))
}