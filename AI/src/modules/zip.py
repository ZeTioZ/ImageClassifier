import zipfile
import pathlib

from AI.src import supported_formats, extracted_path


def extract_zip(zips_path, file_batch_name: str = None) -> bool:
	for zip_path in zips_path:
		if len(zip_path) == 0:
			continue
		if zipfile.is_zipfile(zip_path):
			with zipfile.ZipFile(zip_path, 'r', allowZip64=True) as zip_ref:
				zip_ref.extractall(extracted_path)
		else:
			print(f"{zip_path} is not a valid zip file.")
	if file_batch_name is not None:
		rename_extracted_files(file_batch_name)
	return True


def rename_extracted_files(new_name: str = None, folder_path=extracted_path):
	for index, file in enumerate(pathlib.Path(folder_path).iterdir()):
		if file.suffix not in supported_formats:
			continue
		indexed_name = f"{new_name} #{index}" if len(new_name) > 0 else f"#{index}"
		file.rename(pathlib.Path(folder_path) / f"{indexed_name}{file.suffix}")
