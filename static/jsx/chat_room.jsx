import React, {Component} from 'react';
import Chat from './chat';

/* ChatRoom holdes the conversations between users */

const ChatRoom = ({username, submit, close, chatText, handleUserChatChange, message, primaryUser}) => {

  //If message object doesnt have a key of username then make msgArr equal to an array
   let msgArr = message[username] != null  ? message[username] : ['Error!'];

   //Just in case the user found a way to talk to them self then let them do so.
   //They worked hard for this oppurtunity
   let display = username != primaryUser ? username : 'Are you talking to yourself??!!';

//Chat input form
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit} >
      <label>
        <input id= "inputmsg" type= "text" placeholder= "Get Your Chat On!!" name={username} value= {chatText[username]} onChange={handleUserChatChange}/>
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

    {/* List of messages between users */}
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
