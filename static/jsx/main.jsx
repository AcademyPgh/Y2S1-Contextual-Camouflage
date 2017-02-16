import React, {Component} from 'react';
import autobind from 'class-autobind';
import NameForm from './name_form';
import UserList from './user_list';
import ChatRoom from './chat_room';
import ChatBox from './chat_box';
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
      selectValue: '',
      userTextBox: '',
      openChats: [],
      whosChattering:[],
      hide: false,
      socket: socket
    };
  }
  componentDidMount() {
		// socket.on('init', this._initialize);
    this.state.socket.on('connect', this.alert)
		this.state.socket.on('message', this._messageRecieve);
		// socket.on('user:join', this._userJoined);
		// socket.on('user:left', this._userLeft);
		this.state.socket.on('new_user', this.userNameRecieved);
	}

  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
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
    this.setState({userTextBox: ''});
    this.state.socket.emit('login', userArr);
  }

  handleChange(event){
    alert(event.target.value);
    this.setState({selectValue: event.target.value});

  }

  handleClose(event){
    event.preventDefault;
    alert(event.target.value);
    let index = this.state.chatters.indexOf(event.target.value);
    this.openChats.splice(index, 1);
  }

  handleSubmit(event){
    if(event.charCode == 13){
    event.preventDefault();
    let arrayvar = this.state.openChats.slice();
    let chatters = this.state.whosChattering.slice();
    if(!this.state.whosChattering.includes(event.target.value)){
    chatters.push(event.target.value);
    arrayvar.push(<ChatRoom username= {event.target.value} close={this.handleClose} userValue= {event.target.value}/>);
    this.setState({ openChats: arrayvar , whosChattering: chatters});
    }

  }
  }
  render () {
    return (
      <div>
        <div className= "chatOptions">
        <NameForm handleUserNameChange= {this.handleUserNameChange} textValue= {this.state.userTextBox} handleUserNameSubmit={this.handleUserNameSubmit}/>
         <UserList handleChange={this.handleChange} handleSubmit={this.handleSubmit} selectValue={this.state.selectValue} openChats={this.state.openChats} users={this.state.users}/>
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
