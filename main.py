from flask import Flask, render_template
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
socketio = SocketIO(app)

@socketio.on('message')
def handleMessage(msg):
	print('message', msg)
	send(msg, broadcast = True)


@app.route('/')
def chat_room():
    return render_template("index.html")

if __name__ == '__main__':
	socketio.run(app.run(host='192.168.1.116',debug=True))
