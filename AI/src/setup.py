from setuptools import setup

setup(
	name='ImageClassifier',
	version='0.1',
	description='Image classifier for ASBL Les Scouts',
	packages=['.', '.modules', '.objects'],
	install_requires=[
		'ultralytics',
		'opencv-python',
	],
)