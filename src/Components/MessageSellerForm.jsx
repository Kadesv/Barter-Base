import { useState } from "react";
export function MessageSellerForm({ post, authUser, location }) {
  const [message, setMessage] = useState('');

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
    <div className="collapse bg-base-100 border-2 border-base-300 mt-3">
      <input 
      id={'dropDownInput' + `${location === 'sideComponent'? 'side': ''}` +post.postId + 'component'} type="checkbox" />
      <div className="collapse-title bg-base-100 ">
        Message Seller
      </div>

      <form id={'messageForm' + post.postId + 'component'} onSubmit={(event) => { handleNewChat(event, { user, message }) }} className="collapse-content flex flex-col content-center">
        <input 
        id={'messageInput' + post.postId + 'component'} 
        disabled={!authUser} 
        onChange={(e) => (setMessage(e.target.value))} 
        className="input border-2 border-base-300"
        placeholder={authUser ? 'Type Here...' : 'Please Log In first.'} />
        {authUser ? <button disabled={!authUser} onClick={() => document.getElementById(`model-popup${post.postId}`).close()} className="btn btn-ghost">Send</button> :
          <a className="btn my-1 " href='/signIn'>Log In</a>}
      </form>

    </div>
  );
}
