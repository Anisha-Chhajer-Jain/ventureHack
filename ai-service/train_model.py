import pandas as pd
import numpy as np
import joblib
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import r2_score
import os

def train_model():
    print("Generating synthetic dataset for testing...")
    # Creating a dummy dataset since the original was for soil nutrients
    crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane']
    data = []
    for _ in range(1000):
        crop = np.random.choice(crops)
        area = np.random.uniform(1, 10)
        fert_cost = np.random.uniform(2000, 8000) * area
        pest_cost = np.random.uniform(1000, 4000) * area
        irri_cost = np.random.uniform(500, 2000) * area
        
        # Heuristic for yield/revenue
        yield_per_acre = {'Wheat': 15, 'Rice': 20, 'Maize': 25, 'Cotton': 12, 'Sugarcane': 300}
        price_per_unit = {'Wheat': 2100, 'Rice': 2000, 'Maize': 1900, 'Cotton': 6000, 'Sugarcane': 350}
        
        revenue = yield_per_acre[crop] * area * price_per_unit[crop]
        total_input_cost = fert_cost + pest_cost + irri_cost
        profit = revenue - total_input_cost
        
        data.append([crop, area, fert_cost, pest_cost, irri_cost, profit])
    
    df = pd.DataFrame(data, columns=['crop', 'land_area', 'fertilizer_cost', 'pesticide_cost', 'irrigation_cost', 'profit'])
    
    crop_encoder = LabelEncoder()
    df['crop_encoded'] = crop_encoder.fit_transform(df['crop'])
    
    # Define features and target
    X = df[['crop_encoded', 'land_area', 'fertilizer_cost', 'pesticide_cost', 'irrigation_cost']]
    y = df['profit']
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    print("Training XGBoost Regressor (simulated with RandomForest if not found)...")
    try:
        from xgboost import XGBRegressor
        model = XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    except ImportError:
        print("XGBoost not found, falling back to RandomForestRegressor")
        model = RandomForestRegressor(n_estimators=100, random_state=42)

    model.fit(X_train, y_train)
    
    print("Evaluating model...")
    y_pred = model.predict(X_test)
    r2 = r2_score(y_test, y_pred)
    print(f"R2 Score: {r2:.4f}")
    
    os.makedirs('models', exist_ok=True)
    
    print("Saving model and encoders...")
    joblib.dump(model, 'models/yield_model.pkl')
    joblib.dump(crop_encoder, 'models/crop_encoder.pkl')
    
    print("Training complete!")

if __name__ == "__main__":
    train_model()
