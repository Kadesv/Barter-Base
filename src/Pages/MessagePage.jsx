import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { socket } from "../main";
import { dateFormat } from "../Components/dateFormat";

export default function MessagePage() {
  const navigate = useNavigate();
  const { chatInfo, id } = useLoaderData();
  const chatContainerRef = useRef(null); // Reference to the scrollable chat container
  const [messageList, setMessageList] = useState(chatInfo.messages); // Message list state
  const [message, setMessage] = useState(""); // Input message state
  const { authUser } = useOutletContext();
console.log(authUser)
  // Handle new message submission
  const handleNewChat = async (e) => {
    e.preventDefault();
    if (message === "") return;

    const chatObj = {
      chatId: chatInfo.chatId,
      message,
    };

    const res = await axios.post(`/api/chat/msg`, chatObj);

    if (res.data.success) {
      await socket.emit("send_message", res.data.newMessage);
    }

    setMessage(""); // Clear input after sending message
  };

  // Always scroll to the bottom when a new message is received
  useLayoutEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;  // Force scroll to bottom after messages update
    }
  }, [messageList]); // Trigger when messageList changes (new message arrives)

  // Fetch new messages from the server when received via the socket
  useEffect(() => {
    const handleMessage = async (data) => {
      if (!messageList.some((message) => message.messageId === data.messageId)) {
        const refresh = await axios.get(`/api/chat/${chatInfo.chatId}`);
        setMessageList(refresh.data.chatInfo.messages); // Update the message list
      }
    };

    socket.on("receive_message", handleMessage);

    // Cleanup socket listener on component unmount
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [messageList]);

  // Render chat messages
  const chatMap = messageList.map(({ messageText, createdAt, userId, messageId }) => (
    <div key={messageId + "-messageKey"} className={userId === id ? "chat m-2 chat-start" : "chat m-2 chat-end"}>
      <div className="chat-header flex items-center gap-2">
        {userId === id ?
          <>
            <div className="text-lg text-base-100">You</div>
            <time className="text-xs text-base-100">{dateFormat(createdAt)}</time>
          </>
          :
          <>
            <time className="text-xs text-base-100">{dateFormat(createdAt)}</time>
            <div className="text-lg text-base-100">{userId === chatInfo.user1Id ? chatInfo.user1Id: chatInfo.user2Name}</div>
          </>}
      </div>
      <p className="chat-bubble bg-base-100 break-words ">{messageText}</p>
    </div>
  ));

  return (
    <div className="flex flex-row w-full relative">
      <div className="w-full mb-16 h-screen " ref={chatContainerRef}> {/* Correct full-width and scrollable container */}
        {chatMap} {/* Render messages */}
      </div>
      <form className="z-10 w-full fixed bottom-2" onSubmit={handleNewChat}>
        <label className={`flex input input-bordered relative items-center mx-3 `}>
          <input
            className="  w-full"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="message"
          />
          <button type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="  size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </label>
      </form>
    </div>
  );
}
