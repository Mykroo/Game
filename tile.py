class Tile(object):
	"""Class for map Tiles"""
	width = 70  # tile width in pixels

	def __init__(self, x, y, height, fixed):
		super(Tile, self).__init__()
		# self.rotate = rotate
		self.speed = speed
		self.x = x
		self.y = y
		self.height = height
		self.fixed = fixed

	def getCollision(self):
		"""Summary

		Returns:
		    x: Initial x
		    y: Initial y
		    dx: Final x
		    dy: Final y

		"""
		return (self.x, self.y, self.x + self.width, self.y + self.height)
