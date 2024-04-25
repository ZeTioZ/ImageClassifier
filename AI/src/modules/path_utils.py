import os


def get_parent_path(path: str, level: int = 1) -> str:
	"""Return the parent path of the path."""
	for _ in range(level):
		path = os.path.dirname(path)
	return path
