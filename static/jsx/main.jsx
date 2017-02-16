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
    // const host = ('http://' + document.domain + ':' + location.port);
    const socket = io.connect(host);

    this.state = {
      users: [],
      primaryUser: '',
      selectValue: '',
      userTextBox: '',
      openChats: [],
      whosChattering:[],
      socket: socket,
      messages: []
    };
  }
  componentDidMount() {
    this.state.socket.on('connect', this.alert);
		this.state.socket.on('message', this._messageRecieve);
		this.state.socket.on('new_user', this.userNameRecieved);
    this.state.socket.on('primary_user', this.primaryUser);
	}

  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
  }
  primaryUser(user){
    let primaryUser = user;
    alert(primaryUser);
    this.setState({primaryUser: primaryUser});
  }

  userNameRecieved(users) {
    if (!this.state.users.includes(users)){
      let newUserArr = this.state.users;
      newUserArr.push(users);
      this.setState({users: newUserArr});
    }
  }

  handleUserNameChange(event){
    this.setState({userTextBox: event.target.value});
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
      alert(index);
      let tempChats = this.state.openChats;
      let tempOpenChats = this.state.whosChattering;
      tempChats.splice(index, 1);
      tempOpenChats.splice(index,1);
      this.setState({openChats: tempChats});
  }

  }
  chatSubmit(event){
    event.preventDefault();
    alert('test');
    // let messageArr = this.state.messages[0];
    // userArr.push(this.state.userTextBox);
    // this.setState({userTextBox: ''});
    // this.state.socket.emit('message', messageArr, user);
  }

  handleChatListOpen(event){
    if(event.charCode == 13){
    event.preventDefault();
    let arrayvar = this.state.openChats.slice();
    let chatters = this.state.whosChattering.slice();
    let newMessages = this.state.messages;
    if(!this.state.whosChattering.includes(event.target.value)){
    chatters.push(event.target.value);
    newMessages.push([]);
    arrayvar.push(<ChatRoom username= {event.target.value} close={this.handleChatBoxClose} userValue= {event.target.value} submit= {this.chatSubmit}/>);
    this.setState({ openChats: arrayvar , whosChattering: chatters, messages: newMessages});
    }
  }

  }
  render () {
    return (
      <div>
        <div className= "chatOptions">
        <NameForm handleUserNameChange= {this.handleUserNameChange} textValue= {this.state.userTextBox} handleUserNameSubmit={this.handleUserNameSubmit}/>
         <UserList handleChange={this.handleChatListChange} handleSubmit={this.handleChatListOpen} selectValue={this.state.selectValue} openChats={this.state.openChats} users={this.state.users}/>
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
