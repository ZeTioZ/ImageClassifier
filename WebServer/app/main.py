import shutil
import os
import subprocess
from typing import List

import pathlib
import json

from models.config import Config

from fastapi import FastAPI, UploadFile, File, Form

app = FastAPI()


@app.post("/tags")
async def update_tags(tags: dict):
	if not os.path.exists("../../AI/extracted/"):
		os.makedirs("../../AI/extracted/")
	try:
		with open("../../AI/extracted/generated_tags.json", 'w') as f:
			json.dump(tags, f, indent=4)
	except Exception:
		return {"message": "There was an error updating the tags!"}
	return {"message": "Tags updated", "updated-tags": await get_tags()}


@app.get("/tags")
async def get_tags():
	try:
		with open("../../AI/extracted/generated_tags.json", 'r') as f:
			tags = json.load(f)
	except Exception:
		return {"message": "There was an error reading the tags!"}
	return tags


@app.post("/configs")
async def update_configs(config: Config):
	if not os.path.exists("../../AI/resources/configs"):
		os.makedirs("../../AI/resources/configs")
	try:
		with open("../../AI/resources/configs/config.json", 'w') as f:
			json.dump(config.dict(), f, indent=4)
	except Exception:
		return {"message": "There was an error uploading the configuration file!"}
	return {"message": "Configuration file updated", "updated-config": await get_configs()}


@app.get("/configs")
async def get_configs():
	try:
		with open("../../AI/resources/configs/config.json", 'r') as f:
			config = json.load(f)
	except Exception:
		return {"message": "There was an error reading the configuration file!"}
	return config


@app.post("/uploads")
async def uploads(batch_name: str = Form(None), default_tags: list[str] = Form(None), files: List[UploadFile] = File(...)):
	if not os.path.exists("../uploads"):
		os.mkdir("../uploads")
	for file in files:
		try:
			with open(f"../uploads/{file.filename}", 'wb') as f:
				shutil.copyfileobj(file.file, f)
		except Exception:
			return {"message": "There was an error uploading the file(s)!"}
		finally:
			file.file.close()
	batch_name = f"-n {batch_name} " if batch_name else ""
	default_tags = "-t " + " -t ".join(default_tags) if default_tags else ""
	zips = "-z " + " -z ".join(list(filter(lambda x: x.endswith(".zip"), [os.path.abspath(f'../uploads/{file}') for file in pathlib.Path("../uploads").iterdir()]))) + " "
	print(f"{batch_name}{zips}{default_tags}")
	process = subprocess.run(["py", "../../AI/src/main.py", f"{batch_name}{zips}{default_tags}"])
	if process.returncode != 0:
		return {"message": "There was an error processing the file(s)!"}
	return {"message": f"Successfuly uploaded {[file.filename for file in files]}!"}

if __name__ == "__main__":
	import requests
	url = 'http://127.0.0.1:8000/uploads'
	files_to_send = [('files', open('D:\Immagini\kokkoro-emote-96x96.png', 'rb')), ('files', open('D:\Téléchargements\Immagini.zip', 'rb'))]
	data = {"batch_name": "test", "default_tags": ["1tags", "2tags", "3tags"]}
	resp = requests.post(url=url, data=data, files=files_to_send)
	print(resp)
	print(resp.json())
