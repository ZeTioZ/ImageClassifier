from AI.src.objects import Box
from AI.src.objects import Position


def convert_image_box_outputs(outputs) -> list:
	"""
	Converts the output of the model to a list of boxes.

	:param outputs: A dictionary containing the predicted classes and bounding boxes of the detected objects.
	:return: A list of boxes.
	"""
	boxes = []
	for box_obj in outputs[0].boxes:
		box = box_obj.xyxy[0].tolist()
		position_1 = Position(box[0], box[1])
		position_2 = Position(box[2], box[3])
		boxes.append(Box(position_1, position_2, cls=outputs[0].names[int(box_obj.cls)]))
	return boxes
