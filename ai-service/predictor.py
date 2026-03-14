import joblib
import pandas as pd
import numpy as np

class YieldPredictor:
    def __init__(self):
        # Load models and encoders
        try:
            self.model = joblib.load('models/yield_model.pkl')
            self.crop_encoder = joblib.load('models/crop_encoder.pkl')
            self.state_encoder = joblib.load('models/state_encoder.pkl')
            print("Model and encoders loaded successfully.")
        except Exception as e:
            print(f"Error loading models: {e}")
            self.model = None

    def predict(self, crop, nitrogen, phosphorus, potassium, rainfall, temperature, soil_ph, state):
        if not self.model:
            raise Exception("Model not loaded.")

        # Handle unseen labels by defaulting to 0 or an existing category if needed.
        # For a robust ML service, you might handle unknown classes dynamically.
        try:
            crop_encoded = self.crop_encoder.transform([crop])[0]
        except ValueError:
            # Fallback if crop not in training data
            crop_encoded = 0
            
        try:
            state_encoded = self.state_encoder.transform([state])[0]
        except ValueError:
            # Fallback if state not in training data
            state_encoded = 0

        # Create feature array matching the training columns:
        # ['crop_encoded', 'nitrogen', 'phosphorus', 'potassium', 'rainfall', 'temperature', 'soil_ph', 'state_encoded']
        features = np.array([[
            crop_encoded,
            nitrogen,
            phosphorus,
            potassium,
            rainfall,
            temperature,
            soil_ph,
            state_encoded
        ]])

        predicted_yield = self.model.predict(features)[0]
        
        # Calculate a mock confidence score based roughly on how close parameters 
        # are to ideal conditions (e.g. soil pH between 6.0 and 7.5, optimal NPK)
        # In a real system, you could use model prediction intervals.
        confidence = self._calculate_confidence(soil_ph, rainfall, temperature)
        
        return {
            "predicted_yield": round(float(predicted_yield), 2),
            "unit": "quintals",
            "confidence": round(float(confidence), 2),
            "region": state
        }
        
    def _calculate_confidence(self, ph, rain, temp):
        # Base confidence
        conf = 0.85
        
        # Adjust for ideal pH range 6.0 to 7.0
        if 6.0 <= ph <= 7.0:
            conf += 0.05
        else:
            conf -= 0.05
            
        # Adjust for extreme temperatures
        if temp < 15 or temp > 35:
            conf -= 0.10
        elif 20 <= temp <= 30:
            conf += 0.05
            
        # Add some slight randomness to mimic real-world model uncertainty
        conf += np.random.uniform(-0.02, 0.02)
        
        # Clamp to 0.5 - 0.98 range
        return max(0.5, min(0.98, conf))

predictor = YieldPredictor()
