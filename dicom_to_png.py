import os
from PIL import Image
import numpy as np
import pydicom


def get_names(path):
    names = []
    for root, dirnames, filenames in os.walk(path):
        for filename in filenames:
            _, ext = os.path.splitext(filename)
            if ext in ['.dicom']:
                names.append(filename)
    return names

def convert_dcm_jpg(name):
    im = pydicom.dcmread('input_data/train-selected-1/'+name)
    im = im.pixel_array.astype(float)
    rescaled_image = (np.maximum(im,0)/im.max())*255 
    final_image = np.uint8(rescaled_image) 
    final_image = Image.fromarray(final_image)
    return final_image


names = get_names('input_data/train-selected-1')
output_dir = "input_data/train-selected-1-updated"  

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

for name in names:
    print(f"Processing file: {name}")
    image = convert_dcm_jpg(name)
    image.save(os.path.join(output_dir, name+'.png'))
