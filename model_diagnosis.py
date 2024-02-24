import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout, Input
from tensorflow.keras.utils import to_categorical

# 0 - Aortic enlargement
# 1 - Atelectasis
# 2 - Calcification
# 3 - Cardiomegaly
# 4 - Consolidation
# 5 - ILD
# 6 - Infiltration
# 7 - Lung Opacity
# 8 - Nodule/Mass
# 9 - Other lesion
# 10 - Pleural effusion
# 11 - Pleural thickening
# 12 - Pneumothorax
# 13 - Pulmonary fibrosis
# 14 - No finding


#----------------------------------------------------------------------------------------------------------------------------------------------------------------#
# Rishi's work
# multiinput model that takes symptom and bounding box/area into account 
# assuming that the train.csv 

# Load the dataset
file_path = 'R:/CliniVision/CliniVision/train.csv'
data = pd.read_csv(file_path, dtype={'x_min': float, 'y_min': float, 'x_max': float, 'y_max': float}, low_memory=False)

# Alternatively, convert columns to numeric after loading
for column in ['x_min', 'x_max', 'y_min', 'y_max']:
    data[column] = pd.to_numeric(data[column], errors='coerce')

# Now, compute 'area' and 'aspect_ratio' safely
data['area'] = (data['x_max'] - data['x_min']) * (data['y_max'] - data['y_min'])
data['aspect_ratio'] = (data['x_max'] - data['x_min']) / (data['y_max'] - data['y_min'])
features = pd.concat([symptom_types, data[['area', 'aspect_ratio']]], axis=1)

# Prepare target variable for multi-class classification
# Convert 'diagnosis' to categorical codes if it's not already numeric
if data['diagnosis'].dtype == 'object':
    data['diagnosis'] = data['diagnosis'].astype('category').cat.codes
target = to_categorical(data['diagnosis'])

# One-hot encode `class_id` to represent symptoms, including "No finding"
# class_id_encoded = pd.get_dummies(data['class_id'], prefix='class')
# Merge the one-hot encoded columns back with the original dataframe to maintain the 'image_id'
# data_encoded = pd.concat([data[['image_id']], class_id_encoded], axis=1)
# print(data_encoded)

# Aggregate annotations by image to sum the one-hot encoded symptoms for each image
# aggregated_data = data_encoded.groupby('image_id').sum().reset_index()

# print(aggregated_data)

# Assuming you have a method to map these symptoms to a target variable (diagnoses)
# For demonstration, let's create a dummy target variable based on a hypothetical mapping
# This part needs to be adjusted to reflect your actual target variable preparation
# aggregated_data['target_diagnosis'] = (aggregated_data['class_7'] > 0).astype(int)  # Example: Diagnosis based on 'Lung Opacity'

# Splitting features and target variable for model training
# X = aggregated_data.drop(['image_id'], axis=1)  # Use symptom presence as features, drop 'image_id'
# y = aggregated_data['class_14']  # Example: Using 'No finding' as a simple target, adjust as needed

# Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(features, target, test_size=0.2, random_state=42)

X_train = X_train.astype('float32')
X_val = X_val.astype('float32')
y_train = y_train.astype('float32')
y_val = y_val.astype('float32')


# Example of handling mixed types for a specific column
# Convert the problematic column to a consistent data type, such as string or a numeric type, depending on the context
data['problematic_column'] = pd.to_numeric(data['problematic_column'], errors='coerce')  # Coerce errors will convert invalid values to NaN


# Adjust the model for multi-class classification
model = Sequential([
    Input(shape=(X_train.shape[1],)),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(target.shape[1], activation='softmax')  # Use softmax for multi-class classification
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Fit the model
model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=10, batch_size=32)


#----------------------------------------------------------------------------------------------------------------------------------------------------------------#