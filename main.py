#!/usr/bin/env python3
import random
from rep_timer2 import RepeatedTimer
from player import Player
from flask import Flask, render_template, request, json
from flask_socketio import SocketIO, send

PLAYER_LIST = []
LL = {}
SCKT_LIST = []
TICKS = 0
app = Flask(__name__)
app.config.update(
	SECRET_KEY='secret',
	PORT=5000,
	DEBUG=True)

socketio = SocketIO(app)

@socketio.on('message')
def handleMessage(msg):
	if msg == 'TICKS':
		print('{} TICKS SINCE SERVER START \n***************'.format(TICKS))
	else:
		print('message', msg)
		send(msg, broadcast = True)


# @socketio.on('connection')
# def connection(socket):
# 	print('Newww socket ***************')
# 	# socket.id = random.random()
# 	# socket.x=0
# 	# socket.y=0
# 	# SCKT_LIST[socket.id] = socket 

# @socketio.on('connect')
# def connect():
# 	# socket = None
# 	print('********************   New connection!!!!   ********************')

# 	# player = Player(request.sid, len(PLAYER_LIST), socket, 0, 0)
# 	# PLAYER_LIST.add(player)
# 	socket.id = random.random()
# 	socket.x=0
# 	socket.y=0
# 	LL[socket.id] = data
	

@socketio.on('connect')
def connection():
	if request.sid not in SCKT_LIST:
		print('********************   New connection!!!!   ********************')
		player = Player(request.sid, len(PLAYER_LIST), 0, 0)
		PLAYER_LIST.append(player)
		str(type(player.x))
		SCKT_LIST.append(player.id)
		# PLAYER_LIST.add(player)
		# socket.id = random.random()
		# socket.x=0
		# socket.y=0
		# LL[socket.id] = socket
	else:
		print('********************   Known connection!!!!   ********************')
	print(str(PLAYER_LIST))


@socketio.on('disconnect')
def disconnecting():
	del PLAYER_LIST[request.sid]
	SCKT_LIST.remove(request.sid)
	print('***************\n Removing player from list.... Loging out \n***************')
	print('***************\n {} TICKS SINCE SERVER START \n***************'.format(TICKS))


def tickss():
	# print(msg)
	for plyr in PLAYER_LIST:
		iterTemp = SCKT_LIST[:]
		iterTemp.remove(plyr.id)
		plyr.x = 1
		plyr.y += plyr.number
		socketio.emit('newPos',json.dumps(plyr.jsonify()),skip_sid = iterTemp)




@app.route('/')
def main():
    return render_template("index.html")


if __name__ == '__main__':
	# print(app.config)
	# socketio.run(app.run())
	try:
		gameClock = RepeatedTimer(0.5, tickss)
		# timer = RepeatedTimer(0.05, print, 'Hello world')
	except Exception as e:
		print(e)
	socketio.run(app.run(host='0.0.0.0'))
