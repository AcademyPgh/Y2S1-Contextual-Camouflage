import React, {Component} from 'react';
import autobind from 'class-autobind';

const ChatRoom = ({username, submit, close, userValue, chatText, handleUserChatChange}) => {
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit}>
      <label>
        <input type= "text" placeholder= "Get Your Chat On Cuh!!" name={username} defaultValue= {chatText} onChange={handleUserChatChange}/>
        {/* <input type= "hidden" value={userValue}/> */}
      </label>
    </form>
  </div>
  );
};

  return (
    <div className="chatBox">
      <div id= "chatRoom">
      <h2>{username}</h2>
      <button value= {userValue} onClick= {close}>X</button>
    </div>
    <div className= "messages">
    </div>
      {chatList()}
    </div>
  );
};

export default ChatRoom;
