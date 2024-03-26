import shutil
import os
from typing import List

import pathlib
import json

from models.config import Config
from __init__ import resources_path, extracted_path, uploads_path, get_parent_path, join_char

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()


# CORS settings (see https://fastapi.tiangolo.com/tutorial/cors)
origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/tags")
async def update_tags(tags: dict):
	if not os.path.exists(extracted_path):
		os.makedirs(extracted_path)
	try:
		with open(f"{extracted_path}{join_char}generated_tags.tags", 'w') as f:
			json.dump(tags, f, indent=4)
	except Exception:
		return {"message": "There was an error updating the tags!"}
	return {"message": "Tags updated", "updated-tags": await get_tags()}


@app.get("/tags")
async def get_tags():
	try:
		with open(f"{extracted_path}{join_char}generated_tags.tags", 'r') as f:
			tags = json.loads(f.read())
	except Exception as e:
		print(f"Tags error: {e}")
		return {"message": "There was an error reading the tags!"}
	return tags


@app.post("/configs")
async def update_configs(config: Config):
	if not os.path.exists(resources_path):
		os.makedirs(resources_path)
	try:
		with open(f"{resources_path}{join_char}config.json", 'w') as f:
			json.dump(config.dict(), f, indent=4)
	except Exception as e:
		print(f"Config error: {e}")
		return {"message": "There was an error uploading the configuration file!"}
	return {"message": "Configuration file updated", "updated-config": await get_configs()}


@app.get("/configs")
async def get_configs():
	try:
		with open(f"{resources_path}{join_char}config.json", 'r') as f:
			config = json.load(f)
	except Exception as e:
		print(f"Config error: {e}")
		return {"message": "There was an error reading the configuration file!"}
	return config


@app.post("/uploads")
async def uploads(batch_name: str = Form(None), default_tags: list[str] = Form(None), files: List[UploadFile] = File(...)):
	if not os.path.exists(uploads_path):
		os.mkdir(uploads_path)
	for file in files:
		try:
			with open(f"{uploads_path}{join_char}{file.filename}", 'wb') as f:
				shutil.copyfileobj(file.file, f)
		except Exception:
			return {"message": "There was an error uploading the file(s)!"}
		finally:
			file.file.close()
	batch_name = f"-n {batch_name} " if batch_name else ""
	default_tags = "-t " + " -t ".join(default_tags) if default_tags else ""
	zips = "-z " + (" -z ".join(list(filter(lambda x: x.endswith(".zip"), [os.path.abspath(f"{file}") for file in pathlib.Path(uploads_path).iterdir()])))) + " "
	process = os.system(f"cd {get_parent_path(__file__, 3)} && python -m AI.src.main {batch_name}{zips}{default_tags}")
	if process != 0:
		return {"message": "There was an error processing the file(s)!", "error": process}
	return {"message": f"Successfuly uploaded {[file.filename for file in files]}!", "generated_tags": await get_tags()}


if __name__ == "__main__":
	import requests
	url = 'http://127.0.0.1:8000/uploads'
	files_to_send = [('files', open('D:\Immagini\kokkoro-emote-96x96.png', 'rb')), ('files', open('D:\Téléchargements\Immagini.zip', 'rb'))]
	data = {"batch_name": "test", "default_tags": ["1tags", "2tags", "3tags"]}
	resp = requests.post(url=url, data=data, files=files_to_send)
	print(resp)
	print(resp.json())
