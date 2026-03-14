import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score
import os

def train_model():
    print("Loading dataset...")
    df = pd.read_csv('dataset/crop_yield_data.csv')
    
    # We will use label encoders for categorical features
    # so we can easily map them during prediction
    crop_encoder = LabelEncoder()
    state_encoder = LabelEncoder()
    
    df['crop_encoded'] = crop_encoder.fit_transform(df['crop'])
    df['state_encoded'] = state_encoder.fit_transform(df['state'])
    
    # Define features and target
    X = df[['crop_encoded', 'nitrogen', 'phosphorus', 'potassium', 'rainfall', 'temperature', 'soil_ph', 'state_encoded']]
    y = df['yield']
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training Random Forest Regressor...")
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    print(f"R2 Score: {r2:.4f}")
    
    # Save the model and encoders
    os.makedirs('models', exist_ok=True)
    
    print("Saving model and encoders...")
    joblib.dump(model, 'models/yield_model.pkl')
    joblib.dump(crop_encoder, 'models/crop_encoder.pkl')
    joblib.dump(state_encoder, 'models/state_encoder.pkl')
    
    print("Training complete!")

if __name__ == "__main__":
    train_model()
