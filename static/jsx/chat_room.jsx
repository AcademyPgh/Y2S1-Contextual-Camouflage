import React, {Component} from 'react';
// import autobind from 'class-autobind';
// import Chat from './chat';

const ChatRoom = ({username, submit, close,chatText, handleUserChatChange, message , i}) => {
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit} >
      <label>
        <input type= "text" placeholder= "Get Your Chat On Cuh!!" name={username} defaultValue= {chatText} onChange={handleUserChatChange}/>
      </label>
    </form>
  </div>
  );
};

  return (
    <div className="chatBox">
      <div id= "chatRoom">
      <h2>{username}</h2>
      <button value= {username} onClick= {close}>X</button>
    </div>
    <div className= "messages">
      {/* <Chat key= {i} message= {message[0]}/> */}
    </div>
      {chatList()}
    </div>
  );
};

export default ChatRoom;
