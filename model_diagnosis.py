import pandas as pd
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout

# # 0 - Aortic enlargement
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

# Load the dataset
file_path = 'train.csv'  # Update this path with your actual file location
data = pd.read_csv(file_path)

print(data)

# One-hot encode `class_id` to represent symptoms, including "No finding"
class_id_encoded = pd.get_dummies(data['class_id'], prefix='class')
# Merge the one-hot encoded columns back with the original dataframe to maintain the 'image_id'
data_encoded = pd.concat([data[['image_id']], class_id_encoded], axis=1)

# Aggregate annotations by image to sum the one-hot encoded symptoms for each image
aggregated_data = data_encoded.groupby('image_id').sum().reset_index()

# Assuming you have a method to map these symptoms to a target variable (diagnoses)
# For demonstration, let's create a dummy target variable based on a hypothetical mapping
# This part needs to be adjusted to reflect your actual target variable preparation
# aggregated_data['target_diagnosis'] = (aggregated_data['class_7'] > 0).astype(int)  # Example: Diagnosis based on 'Lung Opacity'

# Splitting features and target variable for model training
X = aggregated_data.drop(['image_id'], axis=1)  # Use symptom presence as features, drop 'image_id'
y = aggregated_data['class_14']  # Example: Using 'No finding' as a simple target, adjust as needed

# Split the data into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

# Define a simple neural network model for binary classification
model = Sequential([
    Dense(128, activation='relu', input_shape=(X_train.shape[1],)),
    Dropout(0.5),
    Dense(64, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')  # Assuming binary classification, adjust if your task is multi-label
])

#model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])

# Train the model on the dataset
#model.fit(X_train, y_train, validation_data=(X_val, y_val), epochs=10, batch_size=32)

# Note: This example uses a simplified target variable and assumes binary classification.
# In practice, you'll need to adjust the target variable preparation and model architecture
# according to your specific project requirements and the complexity of the diagnoses you're predicting.
