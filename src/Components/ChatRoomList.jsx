import { socket } from "../main"
export default function ChatRoomList({ chatRooms, user }) {

const joinRoom = ({chatId})=>{
    socket.emit("join_room", chatId)}

    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Name, user1Name }) => {
        return (
            <div key={chatId} className=" ml-1 bg-base-100 w-4/5 my-2 join join-horizontal  mr-2 ">
                <a href={`/chats/${chatId}`} className=" w-3/4 btn btn-ghost card-title join-item  ">
                {user.userId === user1Id ? user2Name : user1Name}
                </a>
                <button className=" btn btn-ghost join-item">
                :
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



