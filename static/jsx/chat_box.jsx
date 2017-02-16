import React from 'react';

const ChatBox = (chatroom, shouldHide) =>{
  return (
    // <div className= {shouldHide ? 'hidden' : 'chatBox'}>
    <div>
      {chatroom}
    </div>

  );
};

export default ChatBox;
