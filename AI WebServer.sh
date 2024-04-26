echo "Vérification de l'environnement virtuels..." && \
pip install -r ./AI/requirements.txt -q && \
pip install -r ./AI/gpu-enable-requirements.txt -q && \
pip install -r ./WebServer/requirements.txt -q && \
echo "Environnement prêt, allumage des services..." && \
cd ./WebServer/app && \
python -m uvicorn main:app --workers 4