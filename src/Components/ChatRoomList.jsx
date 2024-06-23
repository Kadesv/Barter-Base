export default function ChatRoomList({ chatRooms, user }) {
    console.log(chatRooms)
    const roomsMap = chatRooms.map(({ chatId, user1Id, user2Id, user2Name, user1Name }) => {
console.log(user2Name, user1Name)
        return (
            <div key={chatId} className="card bg-base-100 w-full my-2 h-auto mr-2 ">

                <a as="div" href={`/messages/${chatId}`} className="card-body side-component flex flex-row p-0 ">
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