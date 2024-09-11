import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { socket } from "../main"
import { dateFormat } from "../Components/dateFormat"
export default function MessagePage() {

  const navigate = useNavigate();
  const { chatInfo, id } = useLoaderData()
  const chatContainerRef = useRef(null);
  const [isUserScrolledUp, setIsUserScrolledUp] = useState(false);
  const [messageList, setMessageList] = useState(chatInfo.messages);
  const [message, setMessage] = useState("")
  const { authUser } = useOutletContext()

  const handleNewChat = async (e) => {
    e.preventDefault();
    if (message === '') {
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
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      if (!chatContainer) return;

      // Check if the user is near the bottom
      const isAtBottom = chatContainer.scrollHeight - chatContainer.scrollTop === chatContainer.clientHeight;
      setIsUserScrolledUp(!isAtBottom);
    };

    // Listen to the scroll event
    chatContainer.addEventListener('scroll', handleScroll);

    // Cleanup on unmount
    return () => {
      chatContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMessage = async (data) => {
      if (messageList.find((message) => message.messageId === data.messageId) === undefined) {
        const refresh = await axios.get(`/api/chat/${chatInfo.chatId}`);
        setMessageList(refresh.data.chatInfo.messages);

        // Scroll to bottom only if the user isn't scrolled up
        if (!isUserScrolledUp) {
          const chatContainer = chatContainerRef.current;
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      }
    };

    socket.on("receive_message", handleMessage);

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [messageList, isUserScrolledUp]);


  const chatMap = messageList.map(({ messageText, createdAt, userId, messageId }) => {
    return (
      <div key={messageId + "-messageKey"} className={userId === id ? "chat m-2 chat-start" : "chat m-2 chat-end"}>
        <div className="chat-header">
          <div>{userId === chatInfo.user1Id ? chatInfo.user1Name : chatInfo.user2Name}</div>
          <time className="text-xs ">{dateFormat(createdAt)}</time>
        </div>
        <div className="chat-bubble">
          {messageText}
        </div>
      </div>
    )
  })
  return (
    <div
      className="flex
    flex-row w-full relative">
      <div>
        <div
          className=" w-full flex mb-20 flex-col-reverse"
          ref={chatContainerRef}
        >
          {chatMap.toReversed()}
        </div>
        <form
          className="z-10  join join-horizontal w-2/3 fixed bottom-2"
          onSubmit={(e) => handleNewChat(e)}>
          <input className="input input-bordered w-full join-item" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder="message" />
          <button className="btn join-item btn-outline  ">send</button>
        </form>
      </div>
    </div>
  )
}