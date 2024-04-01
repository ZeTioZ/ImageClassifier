import os

from AI.src.modules.path_utils import get_parent_path

root_path = get_parent_path(__file__, 2)
join_char = os.path.sep
extracted_path = f'{root_path}{join_char}extracted{join_char}'
model_path = f'{root_path}{join_char}models{join_char}scout-model-v3.pt'
supported_formats = [".bmp", ".dib", ".jpeg", ".jpg", ".jpe", ".jp2", ".png", ".webp", ".avif", ".pbm", ".pgm", ".ppm",
                     ".pxm", ".pnm", ".pfm", ".sr", ".ras", ".tiff", ".tif", ".exr", ".hdr", ".pic"]
