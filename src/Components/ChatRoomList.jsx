export default function ChatRoomList({chatRooms}){
const roomsMap = chatRooms.map((room)=>{
    return(
    console.log(room)
)
})
    return(
        <>
        {roomsMap}
        ChatRoomList
        </>
    )
}