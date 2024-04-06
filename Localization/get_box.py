import pandas as pd
from boxsdk import OAuth2, Client
import ast

# Function to find and print matching files based on symptom input
def find_matching_files_based_on_symptom(symptom):
    csv_file_path = 'output.csv'
    CLIENT_ID = ''
    CLIENT_SECRET = ''
    ACCESS_TOKEN = ''
    FOLDER_ID = ''

    # Read the CSV file
    df = pd.read_csv(csv_file_path)
    
    # Ensure symptom is within the expected range
    if symptom < 0 or symptom > 14:
        raise ValueError("Symptom input must be between 0 and 14")

    # Get the list_like_string based on symptom input
    list_like_string = df.loc[symptom, 'image_id']
    image_ids = ast.literal_eval(list_like_string)

    # Setup Box SDK client
    auth = OAuth2(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, access_token=ACCESS_TOKEN)
    client = Client(auth)

    # Find matching files in the specified folder
    matching_files = []
    folder_items = client.folder(folder_id=FOLDER_ID).get_items()
    for item in folder_items:
        file_name_without_extension = item.name.split('.')[0]
        if file_name_without_extension in image_ids:
            matching_files.append(item)

    # Print the names of matching files
    for matching_file in matching_files:
        print(matching_file.name)

# Example usage
find_matching_files_based_on_symptom(0)
