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
    socket.on("receive_message", async (data) => {
      console.log(messageList.find((message) => message.messageId === data.messageId) === undefined)
      if (messageList.find((message) => message.messageId === data.messageId) === undefined) {
        await setMessageList((list) => [...list, data])
      }
      return(
      socket.off("receive_message"))
    })
  }, [socket])


  const chatMap = messageList.map(({ messageText, userId, messageId }) => {
    return (
      <div key={messageId + "-messageKey"} className={userId === user.userId ? "chat chat-start" : "chat chat-end"}>
        <div className=" chat-bubble">
          {messageText}
        </div>
      </div>
    )
  })
  return (
    <div>
      {chatMap}
      <form onSubmit={(e) => handleNewChat(e)}>
        <input className="input" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="message" />
        <button className="btn">send</button>
      </form>
    </div>
  )
}