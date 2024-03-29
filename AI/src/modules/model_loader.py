import hashlib
import torch
import cv2
import pathlib

from ultralytics import YOLO

from AI.src import extracted_path, supported_formats
from AI.src.modules import quality_check
from .yolov8_converter_utils import convert_image_box_outputs


class ModelLoader:
	def __init__(self, model_path):
		self.model = YOLO(model_path)
		self.predictions = None

	def predict(self, image, classes=None, img_size=(640, 640), device: str | None = None):
		"""
		Predicts the classes of the given image.

		:param image: The image to predict the classes of.
		:param classes: The classes to predict.
		:param img_size: The size of the image.
		:param device: The device to use for the prediction.
		:return: The predictions of the model for the given image.
		"""
		if device is None:
			device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
		self.predictions = self.model(image, classes=classes, device=device, imgsz=img_size, verbose=False)
		return self.predictions


def generate_tags(model_path: str, default_tags: list[str] = None) -> dict[str, dict[str, bool | list[str]]]:
	"""
	Generates tags for the given images using the given model.

	:param model_path: The path to the model.
	:param default_tags: The default tags to be added to the images.
	:return: The tags for the images inside a dictionary.
	"""
	default_tags = default_tags if default_tags is not None else []
	model = ModelLoader(model_path)
	tags = {"classes": model.model.names}
	for file in pathlib.Path(extracted_path).iterdir():
		if file.is_file() and file.suffix in supported_formats:
			image_path = file.absolute().__str__()
			image = cv2.imread(image_path)
			predictions = model.predict(image)
			boxes = convert_image_box_outputs(predictions)
			found_tags = list(dict.fromkeys([box.cls for box in boxes]))
			is_qualitative, quality_tags = quality_check.is_qualitative(image, found_tags)
			for banned_tag in quality_tags["banned_tags"]:
				if banned_tag in found_tags:
					found_tags.remove(banned_tag)

			tags[file.name] = {"hash": md5_hash_file(file.absolute().__str__()),
			                   "detection_tags": list(dict.fromkeys([box.cls for box in boxes])) +
			                                     default_tags,
			                   "is_qualitative": bool(is_qualitative),
			                   "quality_tags": list(
				                   filter(lambda x: not isinstance(quality_tags[x], list) and quality_tags[x],
				                          quality_tags.keys())) + quality_tags["banned_tags"]}
	return tags


def md5_hash_file(file_path: str):
	h = hashlib.md5()
	b = bytearray(128*1024)
	mv = memoryview(b)
	with open(file_path, 'rb', buffering=0) as f:
		while n := f.readinto(mv):
			h.update(mv[:n])
	return h.hexdigest()
