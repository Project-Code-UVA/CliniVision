from fastapi import FastAPI, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import cv2
import numpy as np
from PIL import Image
import io
import base64
import predict

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/uploadfile/")
async def process_image(file: UploadFile):
    data = await file.read()

    # Convert bytes to numpy array
    npimg = np.frombuffer(data, np.uint8)

    # Convert numpy array to image
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    bounding_boxes, labels = predict.predict(data)

    # Draw the bounding boxes and labels on the image

    for i, bbox in enumerate(bounding_boxes):
        x1, y1, x2, y2 = bbox
        w = x2 - x1
        h = y2 - y1
        cv2.rectangle(img, (int(x1), int(y1)), (int(x1 + w), int(y1 + h)), (0, 255, 0), 2)
        cv2.putText(img, str(labels[i]), (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
    # Convert the image back to bytes
    is_success, im_buf_arr = cv2.imencode(".jpg", img)
    byte_im = im_buf_arr.tobytes()

    # Encode bytes to base64 string
    img_base64 = base64.b64encode(byte_im).decode('utf-8')

    return {
        'image': img_base64,
        'bounding_boxes': bounding_boxes.tolist(),
        'labels': labels.tolist()
    }

# from fastapi import FastAPI, HTTPException, File, UploadFile
# from fastapi.responses import JSONResponse
# from pydantic import BaseModel
# import mimetypes
# import predict
# from PIL import Image
# from io import BytesIO
# from fastapi.middleware.cors import CORSMiddleware

# app = FastAPI()

# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post("/uploadfile/")
# async def process_image(file: UploadFile = File(...)):
#     try:
#         data = await file.read()
#         mime_type = mimetypes.guess_type(file.filename)[0]
        
#         # Perform inference on the uploaded image
#         bounding_boxes, labels = predict.predict(data)
        
#         # Return the bounding boxes and labels
#         response = {"bounding_boxes": bounding_boxes.tolist(), "labels": labels.tolist()}
#         return JSONResponse(content=response)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
