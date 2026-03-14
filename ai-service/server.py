from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
from predictor import predictor

app = FastAPI(
    title="KisanDost Yield Prediction API",
    description="AI-powered crop yield prediction service for KisanDost Agriculture Platform.",
    version="1.0.0"
)

class YieldPredictionRequest(BaseModel):
    crop: str = Field(..., description="Type of crop constraint (e.g. Wheat, Rice)")
    nitrogen: float = Field(..., description="Soil Nitrogen content (kg/ha)")
    phosphorus: float = Field(..., description="Soil Phosphorus content (kg/ha)")
    potassium: float = Field(..., description="Soil Potassium content (kg/ha)")
    rainfall: float = Field(..., description="Annual rainfall in mm")
    temperature: float = Field(..., description="Average temperature in Celsius")
    soil_ph: float = Field(..., description="Soil pH level (0-14)")
    state: str = Field(default="Rajasthan", description="State or region for regional context")
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class YieldPredictionResponse(BaseModel):
    predicted_yield: float
    unit: str
    confidence: float
    region: str

@app.post("/predict-yield", response_model=YieldPredictionResponse)
async def predict_yield_endpoint(request: YieldPredictionRequest):
    try:
        # For simplicity, we fallback to default state if coordinates are provided 
        # but reverse geocoding is not implemented yet. 
        # For hackathons, hardcoded regional fallback is standard.
        result = predictor.predict(
            crop=request.crop,
            nitrogen=request.nitrogen,
            phosphorus=request.phosphorus,
            potassium=request.potassium,
            rainfall=request.rainfall,
            temperature=request.temperature,
            soil_ph=request.soil_ph,
            state=request.state
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": predictor.model is not None}
