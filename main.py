#!/usr/bin/env python3
from map import Map
import random
from random import randrange
from rep_timer import RepeatedTimer
from player import Player
from flask import Flask, render_template, request, json
from flask_socketio import SocketIO, send

CUR_MAP = Map()
CONNS = 0

SCKT_LIST = []
TICKS = 0
FRAMES = 10
app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret'
# app.config.update(
# 	SECRET_KEY='secret',
# 	PORT=5000,
# 	DEBUG=True)

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
	print("Message received", "#" * 20, msg)
	if msg[0] == '^':
		# print('{} TICKS SINCE SERVER START \n***************'.format(TICKS))
		try:
			send(eval(msg[1:]))
		except Exception as e:
			send(str(e))
	else:
		# print('message', {"msg": request.id, "id": request.sid})
		send(msg, broadcast=True)


@socketio.on('keyPress')
def keyDown(data):
	# print("*" * 15, data, "*" * 15)
	# PLAYERS[request.sid].keyUpdate(data['key'], data['status'])
	ply = CUR_MAP.findPlayer(request.sid)
	if ply:
		ply.keyUpdate(data['key'], data['status'])
		# print(f'\n\n PLAYER DATA:   {ply.jsonify()}   \n\n')
	else:
		print('*'*5 + "Player not found" + '*'*5)
	# print("X:" * 15, PLAYERS[request.sid].x, "*" * 15)
	# print("Y:" , PLAYERS[request.sid].y, "*" * 15)


@socketio.on('connect')
def connection():
	if request.sid not in SCKT_LIST:
		print('********************   New connection!!!!   ********************')
		# player = Player(request.sid, len(PLAYER_LIST), 0, 0)
		player = Player(request.sid, randrange(3), 80, 0)
		CUR_MAP.addPlayer(player)
		# CUR_MAP.genFloor()
		# PLAYERS[request.sid] = player
		# PLAYER_LIST.append(player)
		# str(type(player.x))
		# SCKT_LIST.append(player.id)
		socketio.emit("connected", {"id": player.id, "number": player.number}, room=request.sid)
		# print('********************   ",\
		# 	  "Player({}, {}, {}, {})".format(request.sid, randrange(3), 400, 250),\
		# 	  "   ********************')
		# player.playerData()
		# PLAYER_LIST.add(player)
		# socket.id = random.random()
		# socket.x=0
		# socket.y=0
		# PLAYERS[socket.id] = socket
	else:
		print('********************   Known connection!!!!   ********************')
	# print(str(PLAYERS))


@socketio.on('disconnect')
def disconnecting():
	# for plyr in PLAYER_LIST:
	# 	if plyr.id == request.sid:
	# 		PLAYER_LIST.remove(plyr)
	CUR_MAP.removePlayer(request.sid)
	# del(PLAYERS[request.sid])
	# SCKT_LIST.remove(request.sid)
	# print('***************\n Removing player from list.... Loging out \n***************')
	# print('***************\n {} TICKS SINCE SERVER START \n***************'.format(TICKS))


def tickss(x):
	CUR_MAP.updateAll()
	# socketio.emit('newPos', json.dumps([x.jsonify() for x in PLAYERS.values()]))  # skip_sid=iterTemp skip ids
	plyJson = CUR_MAP.jsonData()
	tilesJson = CUR_MAP.jsonData("map")
	allJson = {"players": plyJson, "tiles": tilesJson}
	# print("JSONDATA: ", json.dumps(allJson))
	socketio.emit('newPos', json.dumps(allJson))  # skip_sid=iterTemp skip ids
	# socketio.emit('newPos', json.dumps([x.jsonify() for x in PLAYER_LIST]))  # skip_sid=iterTemp skip ids


@app.route('/')
def main():
	return render_template("index.html")

@app.route('/Hellow')
def heee():
	return "<h1>Helloi world</h1>"


if __name__ == '__main__':
	# print(app.config)
	# socketio.run(app.run())
	FRAMES = 10
	time = 1 / FRAMES
	try:
		gameClock = RepeatedTimer(time, tickss, TICKS)
		# timer = RepeatedTimer(0.05, print, 'HePLAYERSo world')
	except Exception as e:
		print(e)
	socketio.run(app.run(host='0.0.0.0', port=5001, debug=True))
	# socketio.run(app.run(host='0.0.0.0',threaded=True))
