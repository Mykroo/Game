#!/usr/bin/env python3
import random
from rep_timer import RepeatedTimer
from player import Player
from flask import Flask, render_template, request, json
from flask_socketio import SocketIO, send

CONNS = 0
PLAYERS = {}
SCKT_LIST = []
TICKS = 0
FRAMES = 10
app = Flask(__name__)
app.config.update(
	SECRET_KEY='secret',
	PORT=5000,
	DEBUG=True)

socketio = SocketIO(app)




# @socketio.on('connection')
# def connection(socket):
#	 print('Newww socket ***************')
#	 # socket.id = random.random()
#	 # socket.x=0
#	 # socket.y=0
#	 # SCKT_LIST[socket.id] = socket 

# @socketio.on('connect')
# def connect():
#	 # socket = None
#	 print('********************   New connection!!!!   ********************')

#	 # player = Player(request.sid, len(PLAYER_LIST), socket, 0, 0)
#	 # PLAYER_LIST.add(player)
#	 socket.id = random.random()
#	 socket.x=0
#	 socket.y=0
#	 PLAYERS[socket.id] = data

@socketio.on('message')
def handleMessage(msg):
	if msg[0] == '^':
		# print('{} TICKS SINCE SERVER START \n***************'.format(TICKS))
		try:
			send(eval(msg[1:], {'PLAYERS': PLAYERS}))
		except Exception as e:
			send(str(e))
	else:
		print('message', msg)
		send(msg, broadcast=True)


@socketio.on('keyPress')
def keyDown(data):
	# print("*" * 15, data, "*" * 15)
	PLAYERS[request.sid].keyUpdate(data['key'], data['status']) 
	print("X:" * 15, PLAYERS[request.sid].x, "*" * 15)
	print("Y:" , PLAYERS[request.sid].y, "*" * 15)


@socketio.on('connect')
def connection():
	if request.sid not in SCKT_LIST:
		print('********************   New connection!!!!   ********************')
		# player = Player(request.sid, len(PLAYER_LIST), 0, 0)
		player = Player(request.sid, len(PLAYERS), 400, 250)
		PLAYERS[request.sid] = player
		# PLAYER_LIST.append(player)
		str(type(player.x))
		SCKT_LIST.append(player.id)
		socketio.emit("connected", {"id": player.id, "number": player.number}, room=request.sid)
		# PLAYER_LIST.add(player)
		# socket.id = random.random()
		# socket.x=0
		# socket.y=0
		# PLAYERS[socket.id] = socket
	else:
		print('********************   Known connection!!!!   ********************')
	print(str(PLAYERS))


@socketio.on('disconnect')
def disconnecting():
	# for plyr in PLAYER_LIST:
	# 	if plyr.id == request.sid:
	# 		PLAYER_LIST.remove(plyr)
	del(PLAYERS[request.sid])
	SCKT_LIST.remove(request.sid)
	print('***************\n Removing player from list.... Loging out \n***************')
	print('***************\n {} TICKS SINCE SERVER START \n***************'.format(TICKS))


def tickss(x):
	# print(msg)
	# x += 1
	# for plyr in PLAYER_LIST:
	# 	iterTemp = SCKT_LIST[:]
	# 	iterTemp.remove(plyr.id)
	# 	plyr.x += 1
	# 	plyr.y += plyr.number * 0.4
	for p in PLAYERS.values():
		# p.x += 1
		p.update()
		# p.y += p.number * 0.4

	socketio.emit('newPos', json.dumps([x.jsonify() for x in PLAYERS.values()]))  # skip_sid=iterTemp skip ids
	# socketio.emit('newPos', json.dumps([x.jsonify() for x in PLAYER_LIST]))  # skip_sid=iterTemp skip ids



@app.route('/')
def main():
	return render_template("index.html")


if __name__ == '__main__':
	# print(app.config)
	# socketio.run(app.run())
	FRAMES = 30
	time = 1 / FRAMES
	try:
		gameClock = RepeatedTimer(time, tickss, TICKS)
		# timer = RepeatedTimer(0.05, print, 'HePLAYERSo world')
	except Exception as e:
		print(e)
	socketio.run(app.run(host='0.0.0.0',port=5001))
	# socketio.run(app.run(host='0.0.0.0',threaded=True))
