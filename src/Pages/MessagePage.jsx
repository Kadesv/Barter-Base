import { useLoaderData, useOutletContext } from "react-router-dom"
import { useState } from "react"
export default function MessagePage() {
const {user} = useOutletContext()
const {chatInfo} = useLoaderData()
const [message, setMessage] = useState("")

const handleNewChat=async(event,{chatId})=>{
  event.preventDefault();
  if(!authStatus){
    alert('must sign in for this')
  } else{
  const chatObj = {
    chatId:chatId,
    message: message
  }

  const res = await axios.post(`/api/chat/msg/new`, chatObj)
  console.log(res)
// if(res.data.success){
// // socket.emit("send_message",  res.data.newMessage)
// }
setMessage('')
}}

const chatMap = chatInfo.messages.map(({userId, messageText, messageId}) => {
  // console.log(userId, messageText, messageId)
(<div key={messageId} className={userId === user.userId ? "chat chat-start" : "chat chat-end"}>
{messageText}
</div>

)
})
  return (
<>
{chatMap}
<form onSubmit={(event) => handleNewChat(event,{chatId})}>
  <input onChange={(e)=>{setMessage(e.target.value)}}placeholder="message"/>
  <button>send</button>
</form>
</>
   )
}