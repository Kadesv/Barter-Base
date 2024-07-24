import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { socket } from "../main"
export default function MessagePage() {
const navigate = useNavigate();
  const { user, authStatus } = useOutletContext()
  const { chatInfo } = useLoaderData()
  const [messageList, setMessageList] = useState(chatInfo.messages);
  const [message, setMessage] = useState("")

  const handleNewChat = async (e) => {
    e.preventDefault();
    if (!authStatus) {
      alert('must sign in for this')
    } else if (message === '') {
      return;
    }
    else {
      const chatObj = {
        chatId: chatInfo.chatId,
        message: message
      }
      const res = await axios.post(`/api/chat/msg`, chatObj);

      if (res.data.success) {
        await socket.emit("send_message", res.data.newMessage)
      }
      setMessage('')
    }
  }

  useEffect(() => {
    console.log(authStatus)
    // if(!authStatus){
    //   navigate("/")
    // }
    socket.on("receive_message", async (data) => {
      if (messageList.find((message) => message.messageId === data.messageId) === undefined) {
        await setMessageList((list) => [...list, data])
      }
      return(
      socket.off("receive_message"))
    })
  }, [socket])

console.log(messageList)
  const chatMap = messageList.map(({ messageText, userId, messageId }) => {
    return (
      
      <div key={messageId + "-messageKey"} className={userId === user.userId ? "chat chat-start" : "chat chat-end"}>
         <div className="chat-header">
    userName
    <time className="text-xs opacity-50">12:45</time>
  </div>
        <div className=" chat-bubble">
          {messageText}
        </div>
      </div>
    )
  })
  return (
    <div 
    className="w-auto">
      {chatMap}
      <form 
      className="z-10 fixed bottom-0"
      onSubmit={(e) => handleNewChat(e)}>
        <input className="input" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="message" />
        <button className="btn">send</button>
      </form>
    </div>
  )
}