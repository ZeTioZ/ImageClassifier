from pydantic import BaseModel


class Config(BaseModel):
	blur_precision: float
	image_min_width: int
	image_min_height: int
	image_min_luminance: float
