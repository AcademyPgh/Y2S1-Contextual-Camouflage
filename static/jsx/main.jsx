import React, {Component} from 'react';
import autobind from 'class-autobind'; //autobind functions so you dont have to call this.function = this.function.bind()
import NameForm from './name_form';
import UserList from './user_list';
import ChatRoom from './chat_room';
import Chat from './chat'
import io from 'socket.io-client';

export default class Main extends Component {
  constructor(props){
    super(props);
    autobind(this);
    const host = location.origin.replace(/^http/, 'ws'); //find origin of hosted connection
    const socket = io.connect(host); //connect socket
    const user = JSON.parse(localStorage.getItem("users") || "[]");  //if localStorage of users is empty then return an empty array
    const convo = JSON.parse(localStorage.getItem("convos") || "{}"); //if localStorage of user convos is empy then return empty object
    const primeUser = localStorage.getItem("prime") ?  localStorage.getItem("prime") : ''; //if localStorage of primary Users is empy then return empty string

    this.state = {
      users: user,
      primaryUser: primeUser,
      selectValue: '',
      userTextBox: '',
      chatMessage: '',
      currentChat: '',
      openChats: [],
      convos: convo,
      whosChattering:[],
      socket: socket,
    };

  }
  componentDidMount() {
    this.state.socket.on('connect', this.alert);
    this.state.socket.on('disconnect', this.wave);
    this.state.socket.on('goodbye', this.peaceOut);
		this.state.socket.on('new_user', this.userNameRecieved);
    this.state.socket.on('primary_user', this.primaryUser);
    this.state.socket.on('lets_talk', this.letsTalk);
    this.state.socket.on('send_chat', this.newChatReceived);
    this.state.socket.on('join', this.letsTalk);
    this.state.socket.on('left', this.letsTalk);
    this.state.socket.on('handle_chatObj', this.handleChatObj);
	}
  /* Siging on and signing off of users  */

  //Check Connection
  alert(){
    this.state.socket.emit('my_event', 'CONNECTION');
  }

  //Function for users who sign off
  wave(){
    this.state.socket.emit('leaving', this.state.primaryUser);
}

//Find the index of user who signed off and delete them from the array of active users
  peaceOut(user){
    let index = this.state.users.indexOf(user);
    let tempUsers = this.state.whosChattering;
    tempUsers.splice(index, 1);
    user = '';
    //Update local storage of active users
    localStorage.setItem("users", JSON.stringify(tempUsers));
    localStorage.setItem("prime", user);
    //Update state of active users
    this.setState({users: tempUsers, primeUser: user});
  }
    /* --------           --------- */


    handleUserNameSubmit(event){
      event.preventDefault();
      let userArr = this.state.users;
      let userName = this.state.userTextBox.trim();
      // If user is already signed in then notify them

      // if(this.state.primaryUser != ''){
      //   alert('Already signed in, your name is: '+ this.state.primaryUser);
      // }

      // else {
        if (userName != ''){
          //if there isn't a user with the same name then add the user to our userArr

            if (!userArr.includes(userName)){
              userArr.push(userName);

              //Send new user name to our socket
              this.state.socket.emit('primary_user', userName);

              //change state back to empty
              this.setState({userTextBox: ''});

              //Send new array of users for all to see
              this.state.socket.emit('login', userArr);
            }
            // if our userArr does include the user name
            else {
              alert('Someone has that name');
              this.setState({userTextBox: ''});
            }
          }
          //if userName = '' then do nothing
        else {
          this.setState({userTextBox: ''});
        }
      }
    // }
    /*Find primaryUser and open an array property with their name */
    primaryUser(user){
      let primaryUser = user;
      let conversation = this.state.convos;
      alert('Welcome '+ primaryUser);
      localStorage.setItem("convos", JSON.stringify(conversation));
      localStorage.setItem('prime', primaryUser);
      this.setState({primaryUser: primaryUser, convos: conversation});
      this.state.socket.emit('welcome', this.state.primaryUser)
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

handleChatObj(chatName){
  let chatters = this.state.whosChattering.slice();
  let convoObj = this.state.convos;
  let newChat = this.state.openChats.slice();
  if(!chatters.includes(chatName)
    && chatName != this.state.primaryUser)
    {
      chatters.push(chatName);
      convoObj[chatName] = ['Hi from '+ this.state.primaryUser];
      newChat.push(chatName);
      localStorage.setItem("convos", JSON.stringify(convoObj));
      this.setState({whosChattering: chatters, convos: convoObj, openChats:newChat, currentChat: chatName});
    }

}

  handleChatSubmit(event){
    event.preventDefault();
    let convoObj = this.state.convos;
    //After we submit a message, push that message into our own convo object
    //who's key is the name of who we are chatting with
    convoObj[this.state.currentChat].push(this.state.chatMessage);
    //Send our message, who we are chatting with and who we are to the socket
    this.state.socket.emit('chat', this.state.chatMessage, this.state.currentChat, this.state.primaryUser);
    this.setState({chatMessage: '', convos: convoObj});
  }

  //Function used for chatting between users
  letsTalk(userMsg){
    alert(this.state.currentChat);
    let convoObj = this.state.convos;
    convoObj[this.state.currentChat].push(userMsg);
      this.setState({convos: convoObj});
  }

//Receive new name of active Chatter and add it to our array
  userNameRecieved(users) {
      //** Keeps from creating duplicate users in our user array **
      if (!this.state.users.includes(users)){
        let newUserArr = this.state.users;
        newUserArr.push(users);
        localStorage.setItem("users", JSON.stringify(newUserArr));
        this.setState({users: newUserArr});
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


  newChatReceived(chat){
    let newChat = this.state.openChats.slice();
    newChat.push(chat);
    this.setState({openChats: newChat});
  }


  handleChatBoxOpen(event){
    if(this.state.primaryUser === ''){alert('Not signed in');}
    else {
      if(event.charCode == 13){
        event.preventDefault();
        //Cut up the array because there is a good chance it contains elements
        let chatters = this.state.whosChattering.slice();
        let convoObj = this.state.convos;

        //Dont try to talk to your self
        if(!chatters.includes(event.target.value)
          && event.target.value != ''
          && event.target.value != this.state.primaryUser)
          {
            //Push who we want to chat with into our array
            chatters.push(event.target.value);
            convoObj[event.target.value] = ['Hi from '+ this.state.primaryUser];
            alert(convoObj[event.target.value])
                //Send the socket who we want to talk to and who we are
            this.state.socket.emit('show_room', event.target.value, this.state.primaryUser);
            // this.state.socket.emit('save_chats', event.target.value, this.state.primaryUser);
            this.setState({whosChattering: chatters, convos: convoObj, currentChat: event.target.value});
          }
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
