import sys

import pathlib
import json

from modules.args_parser import parse_arguments
from modules.zip import extract_zip
from modules.model_loader import generate_tags
import os

args = parse_arguments(sys.argv[1:])


def classify():
	"""
	Runs the classification process.
	"""
	# if os.path.exists(pathlib.Path(os.path.abspath(__file__)).parent.parent.absolute().__str__() + '/extracted/'):
	# 	os.rmdir(pathlib.Path(os.path.abspath(__file__)).parent.parent.absolute().__str__() + '/extracted/')

	zips_path = args["zips"][0].split(":")
	tags = args["tags"][0].split(":") if args["tags"] is not None else None
	batch_name = args["name"][0] if args["name"] is not None else None
	extract_zip(zips_path, batch_name)
	generated_tags = generate_tags("../../models/yolov8x.pt", tags)
	json.dump(generated_tags, open(pathlib.Path(os.path.abspath(__file__)).parent.parent.absolute().__str__() + f"/extracted/generated_tags.tags", "w"))


if __name__ == "__main__":
	classify()
