from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from fastapi import File, UploadFile
import mimetypes
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
    data = file.file.read()
    mime_type = mimetypes.guess_type(file.filename)[0]
    
    bounding_boxes, labels = predict.predict(data)
    return {"bounding_boxes": bounding_boxes.tolist(), "labels": labels.tolist()}