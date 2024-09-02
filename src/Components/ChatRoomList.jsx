export default function ChatRoomList({ chatRooms, user }) {

const handleDelete = (e) => {
    e.preventDefault();
    console.log('hit')
}

    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className=" bg-base-100 my-1 w-4/5 rounded-xl ">
                <div  className="btn btn-ghost btn-sm justify-between card-title   ">
                    <a className="flex flex-grow"href={`/chats/${chatId}`}>{user.userId === user1Id ? user2Name : user1Name}</a>

                    <svg 
                    xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="currentColor"
                        onClick={(e)=> handleDelete(e)}
                        className="size-6">
                        <path fillRule="evenodd"
                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>
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