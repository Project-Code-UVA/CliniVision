import pandas as pd
from boxsdk import OAuth2, Client
import ast
import os

def find_matching_files_based_on_symptom(symptom, download_folder_path, num_images=None):
    csv_file_path = 'output.csv'
    CLIENT_ID = ''
    CLIENT_SECRET = ''
    ACCESS_TOKEN = ''
    FOLDER_ID = ''

    if not os.path.exists(download_folder_path):
        os.makedirs(download_folder_path)

    df = pd.read_csv(csv_file_path)
    
    if symptom < 0 or symptom > 14:
        raise ValueError("Symptom input must be between 0 and 14")

    list_like_string = df.loc[symptom, 'image_id']
    image_ids = ast.literal_eval(list_like_string)

    auth = OAuth2(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, access_token=ACCESS_TOKEN)
    client = Client(auth)

    matching_files = []
    folder_items = client.folder(folder_id=FOLDER_ID).get_items()
    for item in folder_items:
        file_name_without_extension = item.name.split('.')[0]
        if file_name_without_extension in image_ids:
            matching_files.append(item)

    # Limit the number of files to download if num_images is specified
    files_to_download = matching_files if num_images is None else matching_files[:num_images]

    for matching_file in files_to_download:
        print(matching_file.name)
        file_path = os.path.join(download_folder_path, matching_file.name)
        with open(file_path, 'wb') as open_file:
            matching_file.download_to(open_file)
    
    print(f"{len(files_to_download)} files downloaded.")


download_folder_path = 'Aortic_Enlargement_Images'
find_matching_files_based_on_symptom(0, download_folder_path, num_images=100)
