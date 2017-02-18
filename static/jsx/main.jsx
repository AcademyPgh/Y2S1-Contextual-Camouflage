import React, {Component} from 'react';
import autobind from 'class-autobind';
import NameForm from './name_form';
import UserList from './user_list';
import ChatRoom from './chat_room';
import Chat from './chat'
import io from 'socket.io-client';
import createFragment from 'react-addons-create-fragment';


export default class Main extends Component {
  constructor(props){
    super(props);
    autobind(this);
    const host = location.origin.replace(/^http/, 'ws');
    const socket = io.connect(host);

    this.state = {
      users: [],
      primaryUser: '',
      selectValue: '',
      userTextBox: '',
      chatMessage: '',
      currentChat: '',
      openChats: [],
      whosChattering:[],
      socket: socket,
      messages: ['Hello','World']
    };

  }
  componentDidMount() {
    this.state.socket.on('connect', this.alert);
		this.state.socket.on('message', this._messageRecieve);
		this.state.socket.on('new_user', this.userNameRecieved);
    this.state.socket.on('primary_user', this.primaryUser);
    this.state.socket.on('lets_talk', this.letsTalk);
    this.state.socket.on('send_chat', this.newChatReceived);
	}

  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
  }
  primaryUser(user){
    let primaryUser = user;
    this.setState({primaryUser: primaryUser});
    this.state.socket.emit('welcome', this.state.primaryUser)
  }
  letsTalk(message, room){
    // let messageArr = this.state.messages.slice();
    let messageArr = this.state.messages;
    let messageIndex =  this.state.whosChattering.indexOf(this.state.currentChat);

  //   if(messageArr[messageIndex].length < 1){
  //     messageArr[messageIndex] = (this.state.primaryUser + ": " + message);
  //     alert(messageArr[messageIndex]);
  // }
  // else{
  //   messageArr[messageIndex] = (this.state.primaryUser + ": " + message);
  //   alert(messageArr[messageIndex]);
  // }
  messageArr.push(message);
    this.setState({messages: messageArr})
  }
  userNameRecieved(users) {
      if (!this.state.users.includes(users)){
        let newUserArr = this.state.users;
        newUserArr.push(users);
        this.setState({users: newUserArr});
      }
  }

  handleUserNameSubmit(event){
    event.preventDefault();
    let userArr = this.state.users;
    userArr.push(this.state.userTextBox);
    this.state.socket.emit('primary_user', this.state.userTextBox);
    this.setState({userTextBox: ''});
    this.state.socket.emit('login', userArr);
  }

  handleChatBoxClose(event){
    event.preventDefault;
    let index = this.state.whosChattering.indexOf(event.target.value);
    if (index > -1){
      this.state.socket.emit('goodbye', event.target.value);
      let tempChats = this.state.openChats;
      let tempOpenChats = this.state.whosChattering;
      tempChats.splice(index, 1);
      tempOpenChats.splice(index,1);
      this.setState({openChats: tempChats});
  }

  }
  handleChatSubmit(event){
    event.preventDefault();
    alert(this.state.currentChat);
    this.state.socket.emit('chat', this.state.chatMessage, this.state.currentChat, this.state.primaryUser);
    this.setState({chatMessage: ''});
  }

  newChatReceived(chat){
    alert('CHATTING WITH: '+ chat);
    let newChat = this.state.openChats.slice();
    newChat.push(chat);
    this.setState({openChats: newChat});
  }

  /*-- Change Handle Section */
  handleUserNameChange(event){
    this.setState({userTextBox: event.target.value});
  }
  handleUserChatChange(event){
    this.setState({chatMessage: event.target.value});
    this.setState({currentChat: event.target.name});
  }
  handleChatListChange(event){
    this.setState({selectValue: event.target.value});
  }
/* ------             ------ */

  handleChatBoxOpen(event){
    if(event.charCode == 13){
    event.preventDefault();
    //Cut up the arrays because there is a good chance they contain elements
    // let arrayvar = this.state.openChats.slice();
    let chatters = this.state.whosChattering.slice();
    //Set newMessages equal to state.messages in order to append a new array of chat messages
    let newMessages = this.state.messages;
    //Dont try to talk to your self
    if(!this.state.whosChattering.includes(event.target.value) && event.target.value != '' && event.target.value != this.state.primaryUser){
      chatters.push(event.target.value);
      newMessages.push([]);
      this.state.socket.emit('show_room', event.target.value);
      this.setState({whosChattering: chatters, messages: newMessages});
    }
  }

  }
  render () {
    return (
      <div>
        <div className= "chatOptions">
        <NameForm handleUserNameChange= {this.handleUserNameChange}
          textValue= {this.state.userTextBox} handleUserNameSubmit={this.handleUserNameSubmit}/>
         <UserList handleChange={this.handleChatListChange} handleSubmit={this.handleChatBoxOpen}
           selectValue={this.state.selectValue} openChats={this.state.openChats} users={this.state.users}/>
          </div>
         <div className= "chatArea">
           {this.state.openChats.map((chats, i) => {
             return (<ChatRoom key= {i} username= {chats} close={this.handleChatBoxClose}
               userValue= {event.target.value} submit= {this.handleChatSubmit}
               chatText= {this.state.chatMessage} handleUserChatChange= {this.handleUserChatChange} message={this.state.messages}/>);
           })}
         </div>

    </div>
    );
  }

}
