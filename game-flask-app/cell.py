class Cell:
	def __init__(self, coordinate, isAlive=False, isBlack=False):
		self.isAlive = isAlive
		self.isBlack = isBlack
		self.clickable = True
		self.coordinate = coordinate

	def __repr__(self):
		# return f'isAlive - {self.isAlive} | isBlack - {self.isBlack} | clickable - {self.clickable}'
		return f'{1 if self.isAlive else 0}'
		# return f'{self.coordinate}'

	def toggleAlive(self):
		self.isAlive = (not self.isAlive)
		self.isBlack = (not self.isBlack)

	def toggleClickable(self):
		self.clickable = (not self.clickable)
