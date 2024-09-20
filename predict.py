import os
import re
import cv2
from ultralytics import YOLO
import torch
import requests
import numpy as np
from flask import Flask, request, jsonify

app = Flask(__name__)

# cargar el modelo y forzar uso de CPU
model = YOLO('C:/Users/angel/OneDrive/Escritorio/aiHack/yolov8n.pt')
device = torch.device('cpu')
model.to(device)

def get_next_filename(directory, base_filename):
    pattern = re.compile(rf"{base_filename}(\d+)\.jpg$")
    existing_files = os.listdir(directory)
    
    max_num = 0
    for filename in existing_files:
        match = pattern.match(filename)
        if match:
            num = int(match.group(1))
            max_num = max(max_num, num)
    
    return os.path.join(directory, f"{base_filename}{max_num + 1}.jpg")

@app.route('/detect', methods=['POST'])
def detect():
    data = request.json
    image_url = data.get('image_url')

    if not image_url:
        return jsonify({"error": "No image URL provided"}), 400

    # descargar la imagen desde el JSON
    try:
        image_response = requests.get(image_url)
        image_response.raise_for_status()
    except requests.RequestException as e:
        return jsonify({"error": str(e)}), 400

    image_array = np.asarray(bytearray(image_response.content), dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)

    if image is None:
        return jsonify({"error": "Error al decodificar la imagen"}), 500

    # guardar la imagen descargada
    downloaded_image_path = get_next_filename('C:/Users/angel/OneDrive/Escritorio/aiHack/img', 'image')
    if not cv2.imwrite(downloaded_image_path, image):
        return jsonify({"error": "Error al guardar la imagen descargada"}), 500

    # inferencia
    results = model.predict(source=image)

    total_vehicles = 0

    for result in results:
        boxes = result.boxes.xyxy
        classes = result.boxes.cls

        if boxes is not None and len(boxes) > 0:
            for i in range(len(boxes)):
                x1, y1, x2, y2 = boxes[i].tolist()
                cls = int(classes[i].item())
                print(f"Detected Class: {cls}, Coordinates: {x1}, {y1}, {x2}, {y2}")  # mensaje de depuración

                if cls in [2, 3, 5, 7]:  # clases para vehículos
                    total_vehicles += 1
                    cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                    label = f"Class {cls}"
                    cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)
                
                if cls in [0, 9]:  # clases para otras cosas
                    total_vehicles += 1
                    cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
                    label = f"Class {cls}"
                    cv2.putText(image, label, (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

    # guardar la imagen procesada
    output_path = get_next_filename('C:/Users/angel/OneDrive/Escritorio/aiHack/img', 'trafico')
    if not cv2.imwrite(output_path, image):
        return jsonify({"error": "Error al guardar la imagen procesada"}), 500

    return jsonify({'total_vehicles': total_vehicles, 'downloaded_image_path': downloaded_image_path, 'output_image_path': output_path})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
