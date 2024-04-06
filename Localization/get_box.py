import pandas as pd
from boxsdk import OAuth2, Client

csv_file_path = 'get_box.csv'


CLIENT_ID = 'YOUR_CLIENT_ID'
CLIENT_SECRET = 'YOUR_CLIENT_SECRET'
ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN'  
FOLDER_ID = 'YOUR_FOLDER_ID'  


df = pd.read_csv(csv_file_path)
image_ids = eval(df['Aortic enlargement'][0])  

# Authenticate with Box
auth = OAuth2(client_id=CLIENT_ID, client_secret=CLIENT_SECRET, access_token=ACCESS_TOKEN)
client = Client(auth)

# Access the directory and filter files by the IDs from the CSV
matching_files = []
folder_items = client.folder(folder_id=FOLDER_ID).get_items()
for item in folder_items:
    if item.id in image_ids:
        matching_files.append(item)

print(matching_files)

