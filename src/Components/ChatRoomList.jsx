import { socket } from "../main"
export default function ChatRoomList({ chatRooms, user }) {

const joinRoom = ({chatId})=>socket.emit("join_room", chatId)
console.log(user)
console.log(chatRooms)

    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className="card bg-base-100 w-full my-2 h-auto mr-2 ">
                <a as="div" onClick={()=>joinRoom(chatId)} href={`/chats/${chatId}`} className="card-body side-component flex flex-row p-0 ">
                    <h4 className="card-title w-10" >{user.userId === user1Id ? user2Name : user1Name}</h4>
                </a>
            </div>
        )
    })
    return (
        <>
            <h1 className="flex justify-center">Chats</h1>
            {roomsMap}
        </>
    )
}



