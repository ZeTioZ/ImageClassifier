@echo off
chcp 65001
echo Vérification de l'environnement virtuel...
python -m pip install --upgrade pip -q & python -m venv .\venv\ & .\venv\Scripts\activate & pip install -r .\AI\requirements.txt -q & pip install -r .\AI\gpu-enable-requirements.txt -q & pip install -r .\WebServer\requirements.txt -q & echo Environnement prêt, allumage des services... & cd .\WebServer\app & python -m uvicorn main:app --reload & cd ..\.. & .\venv\Scripts\deactivate.bat & pausee