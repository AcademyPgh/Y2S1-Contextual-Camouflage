import React, {Component} from 'react';
import autobind from 'class-autobind';
import NameForm from './name_form';
import UserList from './user_list';
import ChatRoom from './chat_room';
import Chat from './chat'
import io from 'socket.io-client';

export default class Main extends Component {
  constructor(props){
    super(props);
    autobind(this);
    const host = location.origin.replace(/^http/, 'ws');
    const socket = io.connect(host);
    const user = JSON.parse(localStorage.getItem("users") || "[]");
    const convo = JSON.parse(localStorage.getItem("convos") || "{}");
    this.state = {
      users: user,
      primaryUser: '',
      selectValue: '',
      userTextBox: '',
      chatMessage: '',
      currentChat: '',
      openChats: [],
      convos: convo,
      whosChattering:[],
      // displayName:'',
      socket: socket,
    };

  }
  componentDidMount() {
    this.state.socket.on('connect', this.alert);
    this.state.socket.on('disconnect', this.wave);
    this.state.socket.on('goodbye', this.peaceOut);
		// this.state.socket.on('message', this._messageRecieve);
		this.state.socket.on('new_user', this.userNameRecieved);
    this.state.socket.on('primary_user', this.primaryUser);
    this.state.socket.on('lets_talk', this.letsTalk);
    this.state.socket.on('send_chat', this.newChatReceived);
    this.state.socket.on('catch_user_error', this.showError);
    // this.state.socket.on('get_display_name', this.getDisplayName)
    this.state.socket.on('join', this.letsTalk);
    this.state.socket.on('left', this.letsTalk);
	}
  /*Check Connection */
  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
  }

  /*Functionw for users who sign off */
  wave(){
    this.state.socket.emit('leaving', this.state.primaryUser);
  }

  peaceOut(user){
    alert(user + ' ' + 'has peaced out');
    let index = this.state.users.indexOf(user);
    let tempUsers = this.state.whosChattering;
    tempUsers.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(tempUsers));
    this.setState({users: tempUsers});
  }
    /* --------           --------- */

  /*Find primaryUser and open an array property with their name */
  primaryUser(user){
    let primaryUser = user;
    let conversation = this.state.convos;

    if (!conversation.hasOwnProperty(primaryUser.toString()))
      {
        conversation[primaryUser.toString()] = ['Lets Chatter!! (submit a chat to confirm connection)'];
      }

    localStorage.setItem("convos", JSON.stringify(conversation));
    this.setState({primaryUser: primaryUser, convos: conversation});
    this.state.socket.emit('welcome', this.state.primaryUser)
  }
  /*Catch Sign in Errors */
  showError(err){
      alert(err);
  }

  /*Function used for chatting between users */

  letsTalk(message){
    let newConversation = this.state.convos;
    let room = this.state.currentChat.toString();

    // if(message == 'y' && newConversation[this.state.primaryUser].length <= 1)
    //
    //   {
    //   newConversation[this.state.primaryUser] = [];
    //   }

    if (!newConversation.hasOwnProperty(room))
      {
        newConversation[room] = [message];
        // this.setState({convos: newConversation});

      }

    else
      {
        newConversation[room].push(message);
        // this.setState({convos: newConversation});
      }
      localStorage.setItem("convos", JSON.stringify(newConversation));
      this.setState({convos: newConversation});


  }

  // getDisplayName(home, away){
  //   alert(home + " " + away);
  //   var name = home != this.state.primaryUser ? home : away;
  //   this.setState({displayName: name});
  // }

  userNameRecieved(users) {
      if (!this.state.users.includes(users)){
        let newUserArr = this.state.users;
        newUserArr.push(users);
        localStorage.setItem("users", JSON.stringify(newUserArr));
        this.setState({users: newUserArr});
      }
      else {
        this.state.socket.emit('error', this.state.primaryUser);
        }
  }

  handleUserNameSubmit(event){
    event.preventDefault();
    let userArr = this.state.users;
    if (this.state.userTextBox != ' '){
      if (!this.state.users.includes(this.state.userTextBox)){
        userArr.push(this.state.userTextBox);
        this.state.socket.emit('primary_user', this.state.userTextBox);
        this.setState({userTextBox: ''});
        this.state.socket.emit('login', userArr);
    }
    else {
      this.state.socket.emit('primary_user', this.state.userTextBox);
      this.state.socket.emit('login', userArr);
      this.setState({userTextBox: ''});
      }
  }
  else {
    this.setState({userTextBox: 'Sign in to chat'});
    }
  }

  handleChatBoxClose(event){
    event.preventDefault;
    let index = this.state.whosChattering.indexOf(event.target.value);
      this.state.socket.emit('logout', event.target.value, this.state.primaryUser);
      let tempChats = this.state.openChats;
      let tempOpenChats = this.state.whosChattering;
      tempChats.splice(index, 1);
      tempOpenChats.splice(index,1);
      this.setState({openChats: tempChats});

  }
  handleChatSubmit(event){
    event.preventDefault();
    let room = this.state.currentChat.toString();
    this.state.socket.emit('chat', this.state.chatMessage, this.state.currentChat, this.state.primaryUser);
    this.setState({chatMessage: ''});
  }

  newChatReceived(chat){
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
    let chatters = this.state.whosChattering.slice();
    //Dont try to talk to your self
    if(!this.state.whosChattering.includes(event.target.value)
    && event.target.value != ''
    && event.target.value != this.state.primaryUser)
      {
        chatters.push(event.target.value);
        this.state.socket.emit('show_room', event.target.value, this.state.primaryUser);
        // this.state.socket.emit('display_name', this.state.primaryUser, event.target.value);
        this.setState({whosChattering: chatters});
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
               primaryUser= {this.state.primaryUser} submit= {this.handleChatSubmit}
               chatText= {this.state.chatMessage} handleUserChatChange= {this.handleUserChatChange} message={this.state.convos}/>);
           })}
         </div>

    </div>
    );
  }

}
