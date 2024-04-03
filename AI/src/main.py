import json
import os
import shutil
import sys

import requests

from AI.src.modules.args_parser import parse_arguments
from AI.src.modules.model_loader import generate_tags
from AI.src.modules.zip import extract_zip

from AI.src import extracted_path, model_path

args = parse_arguments(sys.argv[1:])


def classify():
	"""
	Runs the classification process.
	"""
	if os.path.exists(extracted_path):
		shutil.rmtree(extracted_path)
	os.makedirs(extracted_path)

	if not os.path.exists(model_path):
		with requests.get("https://www.dropbox.com/scl/fi/17jwwukt9e3ofk0b9jnv5/best.pt?rlkey=rle6wa4k0oy6gqhu2y1xx8g1v&dl=1", stream=True) as response:
			response.raise_for_status()
			with open(model_path, 'wb') as model_file:
				for chunk in response.iter_content(chunk_size=10 * 1024):
					model_file.write(chunk)

	zips_path = [arg.strip() for arg in args["zips"]]
	tags = [arg.strip() for arg in args["tags"]] if args["tags"] is not None else None
	batch_name = args["name"][0].strip() if args["name"] is not None else None
	extract_zip(zips_path, batch_name)
	generated_tags = generate_tags(model_path, tags)
	json.dump(generated_tags, open(f"{extracted_path}generated_tags.tags", "w"))


if __name__ == "__main__":
	classify()
