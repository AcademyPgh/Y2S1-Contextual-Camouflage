from flask import Flask, render_template
from flask_socketio import SocketIO, send, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('my_event')
def handleConnetion(message):
    print('Statement: ' + message)
    emit('my_response', message, broadcast=True)

@socketio.on('message')
def handleMessage(messages, room):
    for chat in messages:
        emit('my_response', chat, room=room)

@socketio.on('login')
def handleName(users):
    for name in users:
        emit('new_user', name, broadcast=True)

@socketio.on('primary_user')
def handlePrimaryUser(prime):
    emit('primary_user', prime)

if __name__ == '__main__':
    socketio.run(app)
