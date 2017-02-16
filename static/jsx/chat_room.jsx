import React from 'react';

const ChatRoom = ({username, submit, close, userValue, textValue}) => {
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit}>
      <label>
        <input type="text" placeholder= "Get Your Chat On Cuh!!" value={textValue} name= {userValue}/>
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
