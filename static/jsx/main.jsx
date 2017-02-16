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
      users: ['User 1', 'User 2', 'User 3', "User 4"],
      selectValue: 'User 1',
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
		socket.on('change:name', this.userNameRecieved);
	}

  alert(){
    alert("BOOM");
    this.state.socket.emit('my_event', 'CONNECTION');
  }
  userNameRecieved(user) {
      let userArr = this.state.users;
      userArr.push(message);
      this.setState({users: userArr});
  }

  handleUserNameChange(event){
    this.setState({userTextBox: event.target.value});
  }
  handleUserNameSubmit(event){
    event.preventDefault();
    alert('A name was submitted: ' + this.state.userTextBox);
    this.setState({userTextBox: ''});
  }

  handleChange(event){
    this.setState({selectValue: event.target.value});

  }

  handleClose(event){
    event.preventDefault;
    alert(event.target.value);

    this.setState({hide: true});
  }

  handleSubmit(event){
    if(event.charCode == 13){
    event.preventDefault();
    // alert('A user has been selected: ' + event.target.value);

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
