import os
from PIL import Image
import numpy as np
import pydicom

def get_names(path):
    """Get a list of DICOM file paths from the specified directory."""
    names = []
    for root, dirnames, filenames in os.walk(path):
        for filename in filenames:
            _, ext = os.path.splitext(filename)
            if ext in ['.dicom', '.dcm']:  # Adding .dcm as it's a common extension
                full_path = os.path.join(root, filename)
                names.append(full_path)  # Store the full path
    return names

def convert_dcm_jpg(file_path):
    """Convert DICOM file to JPEG and return it as an image object."""
    im = pydicom.dcmread(file_path)
    im = im.pixel_array.astype(float)
    rescaled_image = (np.maximum(im, 0) / im.max()) * 255 
    final_image = np.uint8(rescaled_image)
    final_image = Image.fromarray(final_image)
    return final_image

def convert_directory_dcm_to_jpg(input_dir, output_dir):
    """Convert all DICOM files in the input directory to JPEG format in the output directory."""
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    names = get_names(input_dir)
    
    for file_path in names:
        print(f"Processing file: {os.path.basename(file_path)}")
        image = convert_dcm_jpg(file_path)
        output_file_path = os.path.join(output_dir, os.path.basename(file_path) + '.png')
        image.save(output_file_path)


input_dir = "Aortic_Enlargement_Images"  
output_dir = "Aortic_Enlargement_Images_PNG"  

convert_directory_dcm_to_jpg(input_dir, output_dir)
