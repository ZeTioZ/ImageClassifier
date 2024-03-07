import shutil
import os
import subprocess
import pathlib
from typing import List

from fastapi import FastAPI, UploadFile, File

app = FastAPI()


@app.get("/")
def home():
	return {"Hello": "World"}


@app.post("/upload")
async def upload(files: List[UploadFile] = File(...)):
	if not os.path.exists("../uploads"):
		os.mkdir("../uploads")
	for file in files:
		try:
			with open(f"../uploads/{file.filename}", 'wb') as f:
				shutil.copyfileobj(file.file, f)
		except Exception:
			return {"message": "There was an error uploading the file(s)"}
		finally:
			file.file.close()
	# joined_files = ":".join([os.path.abspath(f'../uploads/{file}') for file in pathlib.Path("../uploads").iterdir()])
	# subprocess.run(["py", "../../AI/src/main.py", f"-z {joined_files}"])
	return {"message": f"Successfuly uploaded {[file.filename for file in files]}"}


if __name__ == "__main__":
	import requests

	url = 'http://127.0.0.1:8000/upload'
	files_to_send = [('files', open("D:\Immagini\kokkoro-emote-96x96.png", 'rb'))]
	resp = requests.post(url=url, files=files_to_send)
	print(resp.json())
