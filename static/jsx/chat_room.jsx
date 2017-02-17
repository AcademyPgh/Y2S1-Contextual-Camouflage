import React, {Component} from 'react';
import autobind from 'class-autobind';

// export class ChatRoom extends Component {
//   constructor(props){
//     super(props);
//     autobind(this);
//
//     this.state = {
//       text: ''
//     };
//   }
//
//   handleChange(event){
//     this.setState({text: event.target.value});
//   }
//     render (){
//       return (
//       <div className="chatBox">
//         <div id= "chatRoom">
//           <h2>{this.props.username}</h2>
//           <button value= {this.props.userValue} onClick= {this.props.close}>X</button>
//         </div>
//         <div className= "messages">
//         </div>
//       <div className= "chatText">
//           <form onSubmit= {this.props.submit}>
//             <label>
//               <input type="text" placeholder= "Get Your Chat On Cuh!!" value= {this.state.text} onChange={this.handleChange}/>
//             </label>
//           </form>
//         </div>
//       </div>
//     );
//   };
// }
const ChatRoom = ({username, submit, close, userValue, chatObj, handleUserChatChange}) => {
  const chatList = () => {
    return (
      <div className= "chatText">
    <form onSubmit= {submit}>
      <label>
        <input type= "text" placeholder= "Get Your Chat On Cuh!!" defaultValue= {chatObj.chatMessage} onChange={handleUserChatChange}/>
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
