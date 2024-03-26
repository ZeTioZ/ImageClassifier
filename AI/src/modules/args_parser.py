import argparse


def parse_arguments(args: list) -> dict:
	"""
	Parses the CLI arguments.

	:param args:
	:return: dict containing the zip path, tags and batching name.
	"""
	parser = argparse.ArgumentParser(description="Process the given arguments.")
	parser.add_argument("-z", "--zips", "--zip", type=str, required=True, help="The path to the zip(s) file.", action="append")
	parser.add_argument("-t", "--tags", "--tag", type=str, help="The tag(s) to be used for the images.", default=None, action="append")
	parser.add_argument("-n", "--name", type=str, nargs=1, help="The name of the batch.", default=None)
	return vars(parser.parse_args(args))
