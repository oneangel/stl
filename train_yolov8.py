import torch
import os
from ultralytics import YOLO

device = 'cpu' 

# Modelo YOLOv8
model = YOLO('yolov8n.pt').to(device)

# Entrenar el modelo con los datos especificados en data.yaml
if __name__ == '__main__':
    model.train(
        data=r'C:/Users/angel/OneDrive/Escritorio/aiHack/dataset/data.yaml',
        epochs=3,
        imgsz=256,
        batch=128,
        workers=64,
        device=device,
        name='train2',
        pretrained=True,
        optimizer='auto',
        verbose=True,  # Mostrar información detallada durante el entrenamiento
        seed=0,  # Semilla para reproducibilidad
        deterministic=False,
        amp=True  # Usar Mixed Precision Training
    )

    # Evaluar el modelo en el conjunto de prueba
    results = model.val(data=r'C:/Users/angel/OneDrive/Escritorio/aiHack/dataset/data.yaml')

    print(results)