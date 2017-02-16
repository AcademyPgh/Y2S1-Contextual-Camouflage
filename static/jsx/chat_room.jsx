import React from 'react';

const ChatRoom = ({username, submit, close, userValue}) => { //eslint-disable-line
  const chatList = () => {  // eslint-disable-line
    return (
      <div className= "chatText">
    <form onSubmit = {submit}>
      <label>
        <input type="text" placeholder= "Get Your Chat On Cuh!!"/>
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
