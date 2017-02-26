import React from 'react';

/* List of messges between users */ 
const Chat = ({message}) => {
  const chitChat = () => {
      return (
          <li>{message}</li>
      );
};

return (
  <ul>
  {chitChat()}
  </ul>
  );
};

export default Chat;
