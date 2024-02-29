import os
from PIL import Image


def create_mask(image_path, output_path):
    
  image = Image.open(image_path).convert("L")  # Convert to grayscale

  threshold = 128

  # Create a mask by converting pixels above the threshold to white (255) and below to black (0)
  mask = image.point(lambda p: 255 if p > threshold else 0)

  
  mask.save(output_path)


def main():

  input_dir = "input_data/train-selected-updated"
  output_dir = os.path.join("input_data/", "train-selected-masks")

  if not os.path.exists(output_dir):
    os.makedirs(output_dir)

  for filename in os.listdir(input_dir):
    if filename.endswith(".png"):
      image_filename = os.path.splitext(filename)[0]

      image_path = os.path.join(input_dir, filename)
      mask_path = os.path.join(output_dir, f"{image_filename}_mask.png")

      create_mask(image_path, mask_path)
      print(f"Created mask for: {image_filename}")


if __name__ == "__main__":
  main()