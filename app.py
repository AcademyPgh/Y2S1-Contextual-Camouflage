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
def handleMessage(message):
    print('MessageSent: ' + message)
    emit('my_response', message, broadcast=True);

# @socketio.on('name')
# def handleName(nme):
#     send(nme);

if __name__ == '__main__':
    socketio.run(app)
