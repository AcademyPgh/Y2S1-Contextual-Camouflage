import React, {Component} from 'react';
import Chat from './chat';

/* ChatRoom holdes the conversations between users */

const ChatRoom = (props) => {

  //If message object doesnt have a key of username then make msgArr equal to an array
   let msgArr = props.message[props.username] != null  ? props.message[props.username] : ['Error!'];

   //Just in case the user found a way to talk to them self then let them do so.
   //They worked hard for this oppurtunity
   let display = props.username != props.primaryUser ? props.username : 'Are you talking to yourself??!!';

//Chat input form
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {props.submit} >
      <label>
        <input id= "inputmsg" type= "text" placeholder= "Get Your Chat On!!" name={props.username} value= {props.chatText[props.username]} onChange={props.handleUserChatChange}/>
      </label>
    </form>
  </div>
  );
};

  return (
    <div className="chatBox">
      <div id= "chatRoom">
      <h2>{display}</h2>
      <button value= {props.username} onClick= {props.close}>X</button>
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
