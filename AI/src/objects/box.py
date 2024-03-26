from .position import Position


class Box:
	"""
	A class that represents a box of an object in the image.
	"""

	def __init__(self, position_1: Position, position_2: Position, cls: str = None) -> None:
		"""
		Initializes the box of an object in the image.

		:param position_1 (Position): The first position of the box.
		:param position_2 (Position): The second position of the box.
		"""
		self.positions = [position_1, position_2]
		self.cls = cls

	def __str__(self) -> str:
		"""
		:return: A string representation of the Position object.
		"""
		return "Box: ({}, {})".format(self.positions[0], self.positions[1])

	def get_center(self) -> Position:
		"""
		:return: The center of the box.
		"""
		return Position((self.positions[0].x + self.positions[1].x) / 2,
		                (self.positions[0].y + self.positions[1].y) / 2)

	def get_width(self) -> float:
		"""
		:return: The width of the box.
		"""
		return abs(self.positions[0].x - self.positions[1].x)

	def get_height(self) -> float:
		"""
		:return: The height of the box.
		"""
		return abs(self.positions[0].y - self.positions[1].y)

	def get_area(self) -> float:
		"""
		:return: The area of the box.
		"""
		return self.get_width() * self.get_height()
