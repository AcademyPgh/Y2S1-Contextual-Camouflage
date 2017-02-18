import React from 'react';

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
