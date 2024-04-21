import pandas as pd
import os
import numpy as np
import pydicom
from PIL import Image

def automatic_windowing(pixel_array):
    """
    Apply automatic windowing based on percentiles to enhance contrast in the DICOM pixel array.
    
    :param pixel_array: The DICOM pixel array.
    :return: Windowed pixel array scaled to 0-255.
    """
    # Calculate percentiles and the median
    p1, p99 = np.percentile(pixel_array, (1, 99))
    # Apply windowing
    scaled_pixels = np.clip(pixel_array, p1, p99)
    scaled_pixels = np.interp(scaled_pixels, (p1, p99), (0, 255))
    return scaled_pixels.astype(np.uint8)

def crop_images_in_folder(image_folder_path, cropped_folder_path, csv_file_name, class_name=None):
    """
    Crop DICOM images in the folder based on bounding box coordinates and class name specified in a CSV file,
    applying automatic windowing to enhance contrast.
    
    :param image_folder_path: Path to the folder containing the DICOM images.
    :param cropped_folder_path: Path to the folder where cropped images will be saved.
    :param csv_file_name: Path to the CSV file with the image IDs, bounding box coordinates, and class names.
    :param class_name: The class name to filter images by (optional).
    """
    # Load the CSV file into a DataFrame
    df = pd.read_csv(csv_file_name)

    # Filter by class name if specified
    if class_name is not None:
        df = df[df['class_name'] == class_name]

    # Ensure the output folder exists
    os.makedirs(cropped_folder_path, exist_ok=True)

    # Process each DICOM file in the folder
    for image_file in os.listdir(image_folder_path):
        if not image_file.lower().endswith('.dicom'):
            continue

        image_id = os.path.splitext(image_file)[0]

        # Filter DataFrame for current image ID and optional class name
        image_rows = df[df['image_id'] == image_id]
        if image_rows.empty:
            continue

        # Read DICOM file
        dicom_img = pydicom.dcmread(os.path.join(image_folder_path, image_file))
        pixel_array = dicom_img.pixel_array

        # Apply automatic windowing
        windowed_pixel_array = automatic_windowing(pixel_array)

        # Convert to PIL Image for processing
        pil_img = Image.fromarray(windowed_pixel_array)

        # Crop and save each bounding box for the current image
        for index, row in image_rows.iterrows():
            bbox = (int(row['x_min']), int(row['y_min']), int(row['x_max']), int(row['y_max']))
            cropped_img = pil_img.crop(bbox)
            cropped_image_path = os.path.join(cropped_folder_path, f"{image_id}_{index}.png")
            cropped_img.save(cropped_image_path)
            print(f"Cropped and saved: {cropped_image_path}")

    print(f"Completed. Cropped images are saved in {cropped_folder_path}")

# Paths from your previous request
image_folder_path = 'Aortic_Enlargement_Images'
cropped_folder_path = 'Aortic_Enlargement_Images_Cropped'
csv_file_name = '../Data/train.csv'
class_name = "Aortic enlargement"

# Execute the function with the specified parameters
crop_images_in_folder(image_folder_path, cropped_folder_path, csv_file_name, class_name)
