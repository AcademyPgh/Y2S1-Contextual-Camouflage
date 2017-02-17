import React, {Component} from 'react';
import autobind from 'class-autobind';
import NameForm from './name_form';
import UserList from './user_list';
import ChatRoom from './chat_room';
import io from 'socket.io-client';


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
      openChats: [],
      whosChattering:[],
      socket: socket,
      messages: []
    };
  //   this.handleUserNameChange = this.handleUserNameChange.bind(this);
  //  this.handleUserNameSubmit = this.handleUserNameSubmit.bind(this);
  //  this.handleUserChatChange = this.handleUserChatChange.bind(this);
  //  this.handleChatSubmit = this.handleChatSubmit.bind(this);
  //  this.userNameRecieved = this.userNameRecieved.bind(this);
  //  this.handleChatBoxOpen = this.handleChatBoxOpen.bind(this);
  //  this.handleChatBoxClose = this.handleChatBoxClose.bind(this);
  }
  componentDidMount() {
    this.state.socket.on('connect', this.alert);
		this.state.socket.on('message', this._messageRecieve);
		this.state.socket.on('new_user', this.userNameRecieved);
    this.state.socket.on('primary_user', this.primaryUser);
    // this.state.socket.on('lets_talk', this.letsTalk)
	}

  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
  }
  primaryUser(user){
    let primaryUser = user;
    alert(primaryUser);
    this.setState({primaryUser: primaryUser});
    this.state.socket.emit('welcome', this.state.primaryUser)
  }
  letsTalk(){
      alert();
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
    alert(index);
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
    alert(this.state.chatMessage + " " + event.target.name);
    // this.state.socket.emit('chat', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }


  /*-- Change Handle Section */
  handleUserNameChange(event){
    this.setState({userTextBox: event.target.value});
  }
  handleUserChatChange(event){
    this.setState({chatMessage: event.target.value});
  }
  handleChatListChange(event){
    this.setState({selectValue: event.target.value});
  }
/* ------             ------ */

  handleChatBoxOpen(event){
    if(event.charCode == 13){
    event.preventDefault();
    //Cut up the arrays because there is a good chance they contain elements
    let arrayvar = this.state.openChats.slice();
    let chatters = this.state.whosChattering.slice();
    //Set newMessages equal to state.messages in order to append a new array of chat messages
    let newMessages = this.state.messages;
    //Dont try to talk to your self
    if(!this.state.whosChattering.includes(event.target.value) && event.target.value != '' && event.target.value != this.state.primaryUser){
    chatters.push(event.target.value);
    newMessages.push([]);
    //Array of Open Chat Rooms
    arrayvar.push(<ChatRoom username= {event.target.value} close={this.handleChatBoxClose}
      userValue= {event.target.value} submit= {this.handleChatSubmit}
      chatText= {this.state.chatMessage} handleUserChatChange= {this.handleUserChatChange}/>);
      //Join Room of new Private Chat
      this.state.socket.emit('welcome', event.target.value);
      this.setState({ openChats: arrayvar, whosChattering: chatters, messages: newMessages});
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
           {this.state.openChats.map((chats) => {
             return (chats);
           })}
         </div>

    </div>
    );
  }

}
