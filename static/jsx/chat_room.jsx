import React, {Component} from 'react';
import Chat from './chat';

const ChatRoom = ({username, submit, close,chatText, handleUserChatChange, message , i, primaryUser}) => {
  /* Let the user know who they are chatting with or if they are being chatted with */
   let msgArr = message[username] != null  ? message[username] : ['(submit a chat to confirm connection)'];
   let display = username != primaryUser ? username : 'Your the Chattee';

  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit} >
      <label>
        <input id= "msg" type= "text" placeholder= "Get Your Chat On!!" name={username} value= {chatText} onChange={handleUserChatChange}/>
      </label>
    </form>
  </div>
  );
};

  return (
    <div className="chatBox">
      <div id= "chatRoom">
      <h2>{display}</h2>
      <button value= {username} onClick= {close}>X</button>
    </div>
    <div className= "messages">
      { msgArr.map((chats, i) => {
        return (<Chat key= {i} message= {chats}/>);
      })}
    </div>
      {chatList()}
    </div>
  );
};

export default ChatRoom;
