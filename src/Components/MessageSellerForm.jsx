import { useState } from "react";
import { useOutletContext } from "react-router-dom";
export function MessageSellerForm({ post }) {
    const [message, setMessage] = useState('');
    const { authUser } = useOutletContext();

    const handleNewChat = async (e) => {
        e.preventDefault();
        if (!authUser) {
            alert('You must sign in to message the seller.');
            return;
        }
        const chatObj = { postOwner: post.user, message };
        const res = await axios.post(`/api/chat/new`, chatObj);
        if (res.data.success) {
            socket.emit("send_message", res.data.newMessage);
            setMessage('');
        }
    };

    return (
        <div className="collapse bg-base-200 mt-3">
        <input id={'dropDownInput' + post.postId + 'component'} type="checkbox" />
        <div className="collapse-title ">
          Message Seller
        </div>
  
        <form id={'messageForm' + post.postId + 'component'} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content">
          <input id={'messageInput' + post.postId + 'component'} disabled={!authUser} onChange={(e) => (setMessage(e.target.value))} className="input" placeholder={authUser ? 'Type Here...' : 'Please Log In first.'} />
          {authUser ? <button disabled={!authUser} onClick={() => document.getElementById(`model-popup${post.postId}`).close()} className="btn btn-ghost">Send</button> :
            <a className="btn btn-ghost" href='/signIn'>Log In</a>}
        </form>
  
      </div>
    );
}
