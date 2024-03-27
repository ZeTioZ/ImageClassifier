import json
import cv2
import numpy as np

from typing import Any
from PIL.Image import Image
from cv2 import Mat
from numpy.linalg import norm

from AI.src import root_path, join_char


def brightness(img) -> float:
    """
    Calculate the brightness of an image.

    :param img: The image to calculate the brightness of.
    :return: The brightness of the image in the range 0-100.
    """
    if len(img.shape) == 3:
        return np.average(norm(img, axis=2)) / np.sqrt(3)
    else:
        return np.average(img)


def laplacian_variance(image: Image) -> float:
    """
    Calculate the laplacian variance of an image.

    :param image: The image to calculate the laplacian variance of.
    :return: The laplacian variance of the image in the range 0-2000.
    We can consider an image blurry if the variance is less than 150.
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_64F)
    return np.var(laplacian)


def is_qualitative(image: Mat | np.ndarray[Any, np.dtype[np.generic]] | np.ndarray, classes: [str]) -> tuple[bool, dict[str, bool | list[str]]]:
    """
    Check if an image is qualitative.

    :param image: The image to check.
    :param classes: The classes of the image.
    :return: A tuple containing a boolean indicating if the image is qualitative
    and a dictionary containing the reasons why it is not qualitative.
    """
    with open(f"{root_path}{join_char}resources{join_char}config.json") as f:
        config = json.loads(f.read())
    is_blurry = laplacian_variance(image) < config["blur_precision"]
    is_bright = brightness(image) > config["image_min_brightness"]
    has_min_width = image.shape[1] > config["image_min_width"]
    has_min_height = image.shape[0] > config["image_min_height"]
    has_banned_tags = any([tag in classes for tag in config["banned_tags"]])
    result = not is_blurry and is_bright and has_min_width and has_min_height and not has_banned_tags
    return (result, {"blurry": is_blurry, "not_bright": not is_bright, "min_width": not has_min_width,
                     "min_height": not has_min_height, "banned_tags": list(filter(lambda x: x in classes, config["banned_tags"]))})
