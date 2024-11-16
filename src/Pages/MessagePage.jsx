import { useLoaderData, useOutletContext, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef, useLayoutEffect } from "react";
import axios from "axios";
import { socket } from "../socket";
import { dateFormat } from "../Components/dateFormat";

export default function MessagePage() {
  const navigate = useNavigate();
  const { chatInfo, chatMessages, userId } = useLoaderData();
  const chatContainerRef = useRef(null); // Reference to the scrollable chat container
  const [messageList, setMessageList] = useState(chatMessages); // Message list state
  const [messageInput, setMessageInput] = useState(""); // Input message state
  const { authUser } = useOutletContext();
  const [isVisible, setIsVisible] = useState(true); // State to control input visibility
  const [lastScrollTop, setLastScrollTop] = useState(0); // Track last scroll position

  // Handle new message submission
  const handleNewChat = async (e) => {
    e.preventDefault();
    console.log("Socket connected status in handleNewChat:", socket.connected); // Check connection status
    if (!socket.connected) {
      console.warn("Socket is not connected, unable to send message.");
      return;
    }

    if (messageInput === "") return;

    const chatObj = {
      chatId: chatInfo.chatId,
      messageInput,
    };

    try {
      const res = await axios.post(`/api/chat/msg`, chatObj);
      if (res.data.success) {
        socket.emit("send_message", res.data.newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessageInput("");
  };

  // Scroll to the bottom when a new message is received or when the messageList changes
  useLayoutEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;  // Scroll to bottom after messages update
    }
  }, [messageList]);

  // Check connection to socket and reconnect if needed
  useEffect(() => {
    if (socket.connected) {
      console.log("Socket is connected:", socket.id);
    } else {
      console.log("Socket is not connected. Attempting to reconnect...");
      socket.connect(); // Manually attempt to reconnect
    }

    // Log connection events for debugging
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server in MessagePage:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  // Handle scroll behavior to show/hide input field based on scroll direction
  useEffect(() => {
    const chatContainer = chatContainerRef.current;

    const handleScroll = () => {
      const scrollTop = chatContainer.scrollTop;

      if (scrollTop > lastScrollTop) {
        // User is scrolling down
        setIsVisible(true);  // Show input
      } else if (scrollTop < lastScrollTop) {
        // User is scrolling up
        setIsVisible(false); // Hide input
      }

      setLastScrollTop(scrollTop); // Update last scroll position
    };

    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (chatContainer) {
        chatContainer.removeEventListener("scroll", handleScroll); // Clean up event listener on component unmount
      }
    };
  }, [lastScrollTop]);

  // Fetch initial chat messages when chatInfo changes
  useEffect(() => {
    const fetchMessages = async () => {
      const res = await axios.get(`/api/chat/${chatInfo.chatId}`);
      setMessageList(res.data.chatMessages);
    };

    fetchMessages();
  }, [chatInfo.chatId]);

  // Handle receiving new messages via socket
  useEffect(() => {
    const handleMessage = (data) => {
      setMessageList((prevMessageList) => {
        // Check if the new message is already in the list (avoid duplicates)
        if (!prevMessageList.some((message) => message.messageId === data.messageId)) {
          // Add the new message to the list
          return [...prevMessageList, data];
        }
        return prevMessageList;
      });
    };

    socket.on("receive_message", handleMessage);

    // Cleanup socket listener on component unmount
    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [chatInfo.chatId]);

  // Render chat messages from messageList
  const chatMap = messageList.map((chatMessage) => (
    <div key={chatMessage.messageId + "-messageKey"} className={chatMessage.userId === userId ? "chat m-2 chat-start" : "chat m-2 chat-end"}>
      <div className="chat-header flex items-center gap-2">
        {chatMessage.userId === userId ? (
          <>
            <div className="text-lg text-base-100">You</div>
            <time className="text-xs text-base-100">{dateFormat(chatMessage.createdAt)}</time>
          </>
        ) : (
          <>
            <time className="text-xs text-base-100">{dateFormat(chatMessage.createdAt)}</time>
            <div className="text-lg text-base-100">{chatMessage.userId === chatInfo.user1Id ? chatInfo.user1Name : chatInfo.user2Name}</div>
          </>
        )}
      </div>
      <p className="chat-bubble bg-base-100 break-words ">{chatMessage.messageText}</p>
    </div>
  ));

  return (
    <div className="flex flex-col w-full h-screen relative">
      <div className={`flex-grow overflow-y-auto scroll-smooth p-4 mt-2 h-full ${isVisible ? "mb-8" : "mb-0"} `} ref={chatContainerRef}> {/* Correct full-width and scrollable container */}
        {chatMap} {/* Render messages */}
      </div>
      <form className={`z-10 w-full fixed bottom-2 bg-transparent transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`} onSubmit={handleNewChat}>
        <label className={`flex input input-bordered items-center mx-3 `}>
          <input
            className="w-full"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
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
