
class Map(object):
	"""docstring for Map"""
	def __init__(self, player_list=None, width=800, height=500, tileWidth=70):
		super(Map, self).__init__()
		self.player_list = player_list
		self.tile_list = None
		self.enemies_list = None
		self.props_list = None
		self.tileWidth = tileWidth


	def genFloor(self, tileType):
		totalTiles = self.width / self.tileWidth
		for nTile in xrange(0, totalTiles):
			x = nTile * self.tileWidth
			y = 70  # plain heigthfloor
			self.tile_list[nTile] = Tile(x, y)

	def updateAll(self):
		if self.player_list:
			for plyr in self.player_list:
				plyr.update()


class Tile(object):
	"""Class for Tile of the map"""
	def __init__(self, x, tileType="grass", height=70, fixed=True):
		super(Tile, self).__init__()
		self.x = x
		self.y = y
		self.height = height
		self.fixed = fixed
