from flask import Flask, render_template
from flask_socketio import SocketIO, emit, join_room, leave_room

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

#Create single page route
@app.route('/')
def index():
    return render_template('index.html')

#After a user signs in allow them to join their own room
@socketio.on('welcome')
def handleWelcome(room):
    print('Room Name:' + room)
    join_room(room)

#Once a user leaves emit function call to update active user list
@socketio.on('leaving')
def handleDisconnect(user):
    # print('Buh Bye ' + user)
    emit('goodbye', user, broadcast=True)

#Open up a new Chat Room for the Chatter and Chattee
@socketio.on('show_room')
def handleChatOpen(room, user):
    print('Welcome to:' + room)
    emit('send_chat', room)
    emit('handle_chatObj',user, room=room)
    emit('join', user + ": "+ "has joined", room=room)

#Notify other user that you are leaving
@socketio.on('logout')
def handleGoodBye(room, user):
    print (user + " is leaving " + room)
    emit('left', user + ": "+ "has left", room=room)
    leave_room(room)

@socketio.on('my_event')
def handleConnetion(message):
    print('Statement: ' + message)

@socketio.on('chat')
def handlePrivateChat(message, room, user):
    print('Are we talking?: ' + message + ' '+ room)
    emit('lets_talk', user + ': ' + message, room=room)

#Used for when users sign in
@socketio.on('login')
def handleName(users):
    for name in users:
        emit('new_user', name, broadcast=True)

#used to determine the primary user of the local host
@socketio.on('primary_user')
def handlePrimaryUser(prime):
    emit('primary_user', prime)

if __name__ == '__main__':
    socketio.run(app)
