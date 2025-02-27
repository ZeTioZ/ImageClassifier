# Image Classifier and Management Tool

## Overview

This project is an image classification and management tool designed to help users sort, tag, and manage large sets of images efficiently. The tool leverages AI to automatically classify and tag images, while also providing a user-friendly GUI for manual adjustments. The system is built using a combination of modern web technologies and machine learning models, making it both powerful and easy to use.

## Features

### Automatic Image Sorting and Tagging
- **AI-Powered Sorting**: Automatically sorts images based on quality, relevance, and other configurable parameters.
- **Automatic Tagging**: Uses AI to assign keywords to images, helping to classify them by themes and categories.

### User Interface (GUI)
- **Drag & Drop Support**: Easily manage images with drag-and-drop functionality.
- **Batch Naming**: Assign default names to images in bulk.
- **Manual Tagging**: Add or remove tags manually to improve accuracy.
- **Filtering**: Filter images by keywords to quickly identify categories and spot errors.
- **Notifications**: Receive notifications for critical actions and errors.

### Command Line Interface (CLI)
- **Flexible Tagging**: Add tags to images via the CLI.
- **Batch Processing**: Process multiple ZIP files and assign tags in bulk.

### Web Server
- **Easy Setup**: Start the web server with a single script.
- **Docker Support**: Use Docker Compose to set up the entire environment (Web Server, AI, and GUI).

### AI and Machine Learning
- **YOLOv9**: Utilizes the YOLOv9 model for object detection and image classification.
- **RoboFlow**: For dataset creation, annotation, and augmentation.
- **FastAPI**: Powers the REST API for communication between the GUI and the AI backend.

## Technologies Used

### Frontend (GUI)
- **Vue.js**: The core framework for building the user interface.
- **TailwindCSS**: For styling the interface with utility-first CSS.
- **Flowbite**: Provides pre-built components for Vue.js.
- **Axios**: For making HTTP requests to the backend API.
- **zip.js**: For extracting ZIP files directly in the browser.
- **Browser Image Compression**: Compresses images in the browser to save resources.
- **Vue.Draggable**: Enables drag-and-drop functionality for image management.

### Backend (Web Server & AI)
- **Python**: The primary language for the AI and backend logic.
- **FastAPI**: For building the RESTful API.
- **YOLOv9**: For image classification and object detection.
- **RoboFlow**: For dataset management and annotation.
- **CLI**: Command-line interface for batch processing and tagging.

## Installation

### Prerequisites
- **Python**: Install Python 3.8 or higher.
- **Node.js**: Install Node.js for running the GUI.
- **GPU**: Recommended for faster AI processing (NVIDIA GPU with CUDA support).

### Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/image-classifier-tool.git
   cd image-classifier-tool
   ```

2. **Install Dependencies**:
   - For the AI and Web Server:
     ```bash
     pip install -r ./AI/requirements.txt
     pip install -r ./AI/gpu-enable-requirements.txt
     pip install -r ./WebServer/requirements.txt
     ```
   - For the GUI:
     ```bash
     cd gui
     npm install
     ```

3. **Start the Web Server**:
   - For Windows:
     ```bash
     start_server.bat
     ```
   - For Linux:
     ```bash
     ./start_server.sh
     ```

4. **Run the GUI**:
   ```bash
   cd gui
   npm run serve
   ```

5. **Docker Setup (Optional)**:
   - Use Docker Compose to set up the entire environment:
     ```bash
     docker-compose up
     ```

## Usage

### GUI
1. **Upload ZIP Files**: Drag and drop ZIP files containing images into the GUI.
2. **Configure AI**: Set parameters like sharpness, brightness, and banned keywords.
3. **Batch Naming**: Assign default names to images in bulk.
4. **Automatic Sorting and Tagging**: Let the AI sort and tag the images.
5. **Manual Adjustments**: Use drag-and-drop to move images between categories, and add/remove tags as needed.
6. **Filtering**: Filter images by keywords to quickly find specific categories.
7. **Save**: Save the results, and optionally export to Keepeek.

### CLI
- **Basic Usage**:
  ```bash
  imageclassifier -n "Photos camp" -z zip1 -z zip2 -z zip3 -t tag1 -t tag2
  ```
- **Flags**:
  - `-n`: Batch name for images.
  - `-z`: ZIP files to process.
  - `-t`: Tags to assign to images.

### Web Server
- Start the web server using the provided scripts or Docker Compose.

## Future Improvements
- **Bug Fixes**:
  - Fix issues with multiple archive uploads on Chromium-based browsers.
  - Improve drag-and-drop functionality after filtering.
- **Enhancements**:
  - Improve the UX for manual keyword addition.
  - Add more AI models for different types of image classification.
  - Integrate with more external image libraries like Keepeek.

## Performance
- **Minimum Requirements**:
  - CPU: Dual Core x86
  - HDD: 15 GB
  - Software: Python, Node.js
- **Recommended Requirements**:
  - CPU: 8 Core x86
  - GPU: RTX 2060 or higher
  - HDD: 50 GB

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License
This project is open-source and available under the MIT License.

For more detailed documentation, please refer to the [project report](https://github.com/ZeTioZ/ImageClassifier/blob/master/docs/Backlog_%26_documentation_G%C3%A9nie_Logiciel.pdf).
