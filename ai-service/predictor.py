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

    def predict(self, crop, land_area, fertilizer_cost, pesticide_cost, irrigation_cost, state):
        if not self.model:
            raise Exception("Model not loaded.")

        try:
            crop_encoded = self.crop_encoder.transform([crop])[0]
        except ValueError:
            crop_encoded = 0

        # Feature vector: [crop_type_encoded, land_area, fertilizer_cost, pesticide_cost, irrigation_cost]
        features = np.array([[
            crop_encoded,
            land_area,
            fertilizer_cost,
            pesticide_cost,
            irrigation_cost
        ]])

        # Predicted target is now Estimated Profit
        predicted_profitSize = self.model.predict(features)[0]
        predicted_profit = float(predicted_profitSize)

        # Conceptual helper logic for revenue and total cost
        total_cost = fertilizer_cost + pesticide_cost + irrigation_cost
        expected_revenue = predicted_profit + total_cost

        # Simple recommendation logic
        if predicted_profit > 10000:
            recommendation = "This crop is highly profitable under the given input costs."
        elif predicted_profit > 0:
            recommendation = "This crop is profitable under the given input costs."
        else:
            recommendation = "This crop might not be profitable. Consider reducing input costs or switching crop types."

        return {
            "predicted_profit": round(predicted_profit, 2),
            "expected_revenue": round(expected_revenue, 2),
            "total_cost": round(total_cost, 2),
            "recommendation": recommendation,
            "confidence": round(float(self._calculate_confidence(predicted_profit, total_cost)), 2),
            "region": state
        }
        
    def _calculate_confidence(self, profit, cost):
        # Placeholder confidence logic based on profit margin
        if cost == 0: return 0.5
        margin = profit / cost
        conf = 0.85
        if margin > 0.5:
            conf += 0.05
        elif margin < 0:
            conf -= 0.10
            
        conf += np.random.uniform(-0.02, 0.02)
        return max(0.5, min(0.98, conf))

predictor = YieldPredictor()
