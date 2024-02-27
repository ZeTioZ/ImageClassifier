import torch
import cv2
import pathlib
import os

from ultralytics import YOLO

from .draw_utils import box_visualizer
from .yolov8_converter_utils import convert_image_box_outputs


class ModelLoader:
	def __init__(self, model_path):
		self.model = YOLO(model_path)
		self.predictions = None

	def predict(self, image, classes=None, img_size=(640, 640), device: str | None = None):
		if device is None:
			device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
		self.predictions = self.model(image, classes=classes, device=device, imgsz=img_size, verbose=False)
		return self.predictions


def generate_tags(model_path: str, default_tags: list[str] = None) -> dict[str, list[str]]:
	"""
	Generates tags for the given images using the given model.

	:param model_path: The path to the model.
	:param images_path: The path to the images.
	:param default_tags: The default tags to be added to the images.
	:return: The tags for the images inside a dictionary.
	"""
	model = ModelLoader(model_path)
	tags = {}
	for file in pathlib.Path(os.path.abspath(pathlib.Path(os.path.abspath(__file__)).parent.parent.parent.absolute().__str__() + '/extracted/')).iterdir():
		if file.is_file() and file.suffix == '.jpg' or file.suffix == '.png' or file.suffix == '.jpeg':
			image_path = file.absolute().__str__()
			image = cv2.imread(image_path)
			predictions = model.predict(image)
			boxes = convert_image_box_outputs(predictions)
			# FOR DEMO
			prediction_image = box_visualizer(image, boxes, print_classes=True)
			multiplier = image.shape[1] / 1000
			prediction_image = cv2.resize(prediction_image, (int(image.shape[1]/multiplier), int(image.shape[0]/multiplier)))
			cv2.imshow('Prediction', prediction_image)
			cv2.waitKey(0)
			cv2.destroyAllWindows()
			# END FOR DEMO
			tags[file.name] = list(dict.fromkeys([box.cls for box in boxes] + default_tags))
	return tags
