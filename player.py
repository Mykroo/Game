import json


class Player(object):
	"""Class for Player"""
	def __init__(self, idd, number, pox, poy):
		"""Summary constructor

		Args:
			id (hex): socket id
			number (TYPE): player number
			pox (int): position x
			poy (int): position y
			keys (dict): {'key':'status'}
		"""
		super(Player, self).__init__()
		# self.socket = socket
		self.animation = "walk"
		self.rotate = False
		self.speed  = 10
		self.keys = {
			"tab"   : False,
			"space" : False,
			"left"  : False,
			"right" : False,
			"up"    : False,
			"down"  : False}
		self.id     = idd
		self.number = int(number)
		self.x      = int(pox)
		self.y      = int(poy)
		self.jumping = False
		self.jumpCount = 0

	def update(self):
		# print("Updating pos ------ Keys:", self.keys )
		self.rotate = False
		self.animation = "still"
		if self.keys["tab"]:
			pass
		if self.keys["space"]:
			if self.animation != "airborne":
				self.jumping = True
				self.animation = "airborne"
		if self.keys["left"]:
			self.x -= self.speed
			self.rotate = True
		if self.keys["right"]:
			self.x += self.speed
		if self.keys["up"]:
			pass  # self.y -= self.speed
		if self.keys["down"]:
			if self.jumping is False:
				self.animation = "crouch"
			else:
				self.y += int(self.speed * 0.5)
		self.jump()

	def jump(self):
		# print("jumping")
		if self.jumping and self.jumpCount <= 5:
			self.jumpCount += 1
			self.y -= self.speed * 4
			self.animation = "airborne"
		else:
			self.jumpCount = 0
			self.jumping = False

	def animationStatus():
		pass

	def walk():
		pass

	def __repr__(self):
		return "Player([{}, {}, {}, {}])".format(self.id, self.number, self.x, self.y)

	def __str__(self):
		return "id: {}, number: {}, x: {}, y: {}, status: ])".format(self.id, self.number, self.x, self.y, self.rotate)

	def toJSON(self):
		return json.dumps(self, default=lambda o: o.__dict__, 
			sort_keys=True, indent=4)

	def jsonify(self):
			
		# self.update()
		return {'id': self.id,
				'number': self.number,
				'x': self.x,
				'y': self.y,
				'keys': self.keys,
				'rotate': self.rotate
				}

	def keyUpdate(self, key, status):
		# print("Key & Status: ", key, status)
		self.keys[key] = status
