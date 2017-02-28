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

    this.state = {
      users: user,
      primaryUser: '',
      selectValue: '',
      userTextBox: '',
      chatMessage: '',
      messageChat:{},
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

    //Update state of active users
    this.setState({users: tempUsers, primeUser: user});
  }
    /* -------- ------   ------    ------ --------- */


    handleUserNameSubmit(event){
      event.preventDefault();
      let userArr = this.state.users;
      let userName = this.state.userTextBox.trim();
      // If user is already signed in then notify them

      if(this.state.primaryUser != ''){
        alert('Already signed in, your name is: '+ this.state.primaryUser);
      }

      else {
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

              // alert('Looks like someone is chatting with that name 👀')
              this.setState({userTextBox: '', primaryUser: userName});
              this.state.socket.emit('primary_user', userName);
            }
          }
          //do nothing if userName = ''
        else {
          this.setState({userTextBox: ''});
        }
      }
    }

    /*Find primaryUser and open an array property with their name */
    primaryUser(user){
      alert('Welcome '+ user);
      this.setState({primaryUser: user});
      this.state.socket.emit('welcome', this.state.primaryUser)
    }

    /*-- Change Handle Section */
    handleUserNameChange(event){
      this.setState({userTextBox: event.target.value});
    }
    handleUserChatChange(event){
      let msgObj = this.state.messageChat;
      msgObj[this.state.currentChat] = event.target.value;
      this.setState({messageChat: msgObj});
      this.setState({currentChat: event.target.name});
    }
    handleChatListChange(event){
      this.setState({selectValue: event.target.value});
    }
  /* ------             ------ */


//Handle the saving of conversations by creating chat obj
//Our key being the users name who we are chatting with
handleChatObj(chatName){
  let chatters = this.state.whosChattering.slice();
  let convoObj = this.state.convos;
  let newChat = this.state.openChats.slice();

  if(!chatters.includes(chatName)
    && chatName != this.state.primaryUser)
    {
      chatters.push(chatName);

      if(!(chatName in convoObj)){
        convoObj[chatName] = [''];
      }
      newChat.push(chatName);
      this.setState({whosChattering: chatters, convos: convoObj, openChats: newChat, currentChat: chatName});
    }

}

  handleChatSubmit(event){
    event.preventDefault();
    let convoObj = this.state.convos;
    let msgObj = this.state.messageChat;
    let msg = msgObj[this.state.currentChat];

    //After we submit a message, push that message into our own convo object
    //who's key is the name of who we are chatting with
    convoObj[this.state.currentChat].push(msg);

    //Send our message, who we are chatting with and who we are to the socket
    this.state.socket.emit('chat', msg, this.state.currentChat, this.state.primaryUser);
    // localStorage.setItem("convos", JSON.stringify(convoObj));

    msgObj[this.state.currentChat]= '';
    this.setState({convos: convoObj, messageChat: msgObj});
  }

  //Function used for chatting between users
  letsTalk(userMsg){

    //Find are User to make sure we are pushing to the correct array
    let index = userMsg.indexOf(':');
    let user = userMsg.slice(0,index);
    let convoObj = this.state.convos;
    convoObj[user].push(userMsg);
    localStorage.setItem("convos", JSON.stringify(convoObj));
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

//Close Chat Box by finding the position of who you are talking to and splice for that index to 1
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

  //Receive chat from socket and push it into our chat array
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
        let msgObj = this.state.messageChat;
        let convoObj = this.state.convos;

        //Dont try to talk to your self
        if(!chatters.includes(event.target.value)
          && event.target.value != ''
          && event.target.value != this.state.primaryUser)
          {
            //Push who we want to chat with into our array
            chatters.push(event.target.value);
            if (!(event.target.value in convoObj)) {
              convoObj[event.target.value] = [''];
          }

            msgObj[event.target.value]= '';

                //Send the socket who we want to talk to and who we are
            this.state.socket.emit('show_room', event.target.value, this.state.primaryUser);
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
               chatText= {this.state.messageChat} handleUserChatChange= {this.handleUserChatChange} message={this.state.convos}/>);
           })}
         </div>

    </div>
    );
  }

}
