class Player(object):
	"""Class for Player"""
	def __init__(self, id, number, pox, poy):
		"""Summary constructor

		Args:
		    id (TYPE): socket id
		    number (TYPE): player number
		    pox (TYPE): position x
		    poy (TYPE): position y
		"""
		super(Player, self).__init__()
		# self.socket = socket
		self.pressLeft  = None
		self.pressRight = None
		self.pressUp    = None
		self.pressDown  = None
		self.id         = id
		self.number     = int(number)
		self.x          = int(pox)
		self.y          = int(poy)

	def walk():
		frame = 0


	def __repr__(self):
		return "Player([{}, {}, {}, {}])".format(self.id, self.number, self.x, self.y)
	

	def __str__(self):
		return "id: {}, number: {}, x: {}, y: {}])".format(self.id, self.number, self.x, self.y)

	def jsonify(self):
		return {'id':self.id,'number':self.number,'x':self.x,'y':self.y}