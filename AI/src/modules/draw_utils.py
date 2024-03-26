import cv2
import numpy as np
from PIL.Image import Image

from AI.src.objects import Box
from AI.src.objects import Position


def print_class(param_image: np.ndarray | Image, position: Position, cls: str, color: tuple = (200, 200, 200), thickness: int = 2):
	cv2.putText(img=param_image, org=position.to_tuple(), text=cls, thickness=thickness, color=color, fontFace=cv2.FONT_HERSHEY_SIMPLEX, fontScale=1, lineType=cv2.LINE_AA)


def box_visualizer(param_image: np.ndarray | Image, boxes: list[Box], color: tuple = (200, 200, 200),
                   thickness: int = 2, print_classes: bool = False):
	"""
	Visualizes boxes in the given image.

	:param param_image: A numpy array representing the image.
	:param boxes: A list containing bounding boxes of the detected objects.
	:param color: The color of the bounding boxes.
	:param thickness: The thickness of the bounding boxes.
	"""
	if isinstance(param_image, Image):
		param_image = np.array(param_image)
	image = param_image.copy()

	for box in boxes:
		draw_box(image, box, color, thickness)
		if print_classes:
			print_class(image, box.positions[0], box.cls, color, thickness)

	return image


def draw_box(image: np.ndarray, box: Box, border_color: tuple = (0, 255, 0), thickness: int = 2,
             fill_color: tuple | None = None):
	if fill_color is not None:
		cv2.rectangle(image, box.positions[0].to_tuple(), box.positions[1].to_tuple(), fill_color, cv2.FILLED)
	cv2.rectangle(image, box.positions[0].to_tuple(), box.positions[1].to_tuple(), border_color, thickness)
