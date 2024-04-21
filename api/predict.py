import torch
from PIL import Image
from io import BytesIO

weights = 'best.pt'
model = torch.hub.load('ultralytics/yolov5', 'custom', weights)

def predict(image):
    model.eval()
    img = Image.open(BytesIO(image))
    results = model(img)
    
    bounding_boxes = results.xyxy[0][:, :4].cpu().numpy()  # Extract bounding boxes
    labels = results.xyxy[0][:, 5].cpu().numpy()  # Extract labels

    return bounding_boxes, labels