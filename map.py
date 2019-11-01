
class Map(object):
	"""docstring for Map"""
	def __init__(self, player_list=None, width=1800, height=500, tileWidth=70, gravity=0):
		super(Map, self).__init__()
		if player_list:
			self.player_list = player_list
		else:
			self.player_list = []
		self.tile_list = None
		self.enemies_list = None
		self.props_list = None
		self.tileWidth = tileWidth
		self.width = width
		self.gravity = gravity

	def genFloor(self):
		if self.tile_list is None:
			self.tile_list = []
			print("*"*5, "Generating Tiles for the floor","*"*5)
			totalTiles = int(self.width / self.tileWidth)
			for nTile in range(0, totalTiles):
				x = nTile * self.tileWidth
				y = 70  # plain heigthfloor
				self.tile_list.append(Tile(x, y))
		else:
			print("*" * 5, " Tiles not generated !!!", "*" * 5)

	def updateAll(self):
		if self.player_list:
			for plyr in self.player_list:
				plyr.y += self.gravity
				plyr.update()
				self.checkTileCollitions(plyr)

	def checkTileCollitions(self, player):
		tileIndx = int(player.x / self.tileWidth)
		# print("Check colision...... ", "!!!!!!"*5)
		if tileIndx < len(self.tile_list):
			if (player.x >= self.tile_list[tileIndx].x and
						player.x < (self.tile_list[tileIndx].x + self.tileWidth) and
						player.y > self.tile_list[tileIndx].y and
						player.y <= (self.tile_list[tileIndx].y + self.tile_list[tileIndx].height)):
				player.y = self.tile_list[tileIndx].y
				print("Collisionnnnnnnn!!!! " * 5)

	# def addPlayer(self, sid, character, x, y):
	def addPlayer(self, player):
		self.player_list.append(player)
		if len(self.player_list) > 0 and self.tile_list is None:
			self.genFloor()

	def removePlayer(self, sid):
		for plyr in self.player_list:
			if plyr.id == sid:
				self.player_list.remove(plyr)
				# print(f"\nPLAYER {sid} FROM LIST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n")
				# print([x.id for x in self.player_list])
				break
		# print("\nPLAYER NOT FOUUUUUUHNDDDDDDDDDDDDDDDDDDDD ON LIST**************************!\n")


	def findPlayer(self, sid):
		for plyr in self.player_list:
			if plyr.id == sid:
				return plyr

	def jsonData(self, data="players"):
		if self.tile_list:
			if data == "map":
				return [x.jsonify() for x in self.tile_list]
		if self.player_list:
			if data == "players":
				return [x.jsonify() for x in self.player_list]
		if self.enemies_list:
			if data == "enemies":
				return [x.jsonify() for x in self.enemies_list]

class Tile(object):
	"""Class for Tile of the map"""
	def __init__(self, x, y, tileType="grass", height=70, fixed=True):
		super(Tile, self).__init__()
		self.x = x
		self.y = y
		self.height = height
		self.fixed = fixed
		self.tileType = tileType

	def jsonify(self):
		return {'x': self.x,
				'y': self.y,
				'tileType': self.tileType
				}
