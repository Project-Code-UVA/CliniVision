import pandas as pd
from boxsdk import OAuth2, Client
import ast

csv_file_path = 'output.csv'

CLIENT_ID = '' 
CLIENT_SECRET = '' 
ACCESS_TOKEN = ''   
FOLDER_ID = '' 



df = pd.read_csv(csv_file_path)
list_like_string = df.loc[0, 'image_id']
image_ids = ast.literal_eval(list_like_string)


auth = OAuth2(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, access_token=ACCESS_TOKEN)
client = Client(auth)


matching_files = []
folder_items = client.folder(folder_id=FOLDER_ID).get_items()
for item in folder_items:
    file_name_without_extension = item.name.split('.')[0]
    if file_name_without_extension in image_ids:
        matching_files.append(item)


for matching_file in matching_files:
    print(matching_file.name)