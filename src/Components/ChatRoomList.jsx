import { socket } from "../main"
export default function ChatRoomList({ chatRooms, user }) {



    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className=" ml-1 bg-base-100 w-4/5 my-2 join join-horizontal  mr-2 ">
                <a href={`/chats/${chatId}`} className=" w-10/12 btn btn-ghost card-title join-item  ">
                    {user.userId === user1Id ? user2Name : user1Name}
                </a>
                <button className=" join-item flex-grow"
                onClick={()=> handleDelete()}
                >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24" fill="currentColor"
                        className="size-6 ">
                        <path fillRule="evenodd"
                            d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" clipRule="evenodd" />
                    </svg>

                </button>
            </div>
        )
    })
    return (
        <>
            {roomsMap}
        </>
    )
}