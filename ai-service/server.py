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
    crop: str = Field(..., description="Type of crop (e.g. Wheat, Rice)")
    land_area: float = Field(..., description="Land area in acres")
    fertilizer_cost: float = Field(..., description="Total fertilizer cost in ₹")
    pesticide_cost: float = Field(..., description="Total pesticide cost in ₹")
    irrigation_cost: Optional[float] = Field(0.0, description="Total irrigation cost in ₹")
    state: str = Field(default="Rajasthan", description="State or region for regional context")

class YieldPredictionResponse(BaseModel):
    predicted_profit: float
    expected_revenue: float
    total_cost: float
    recommendation: str
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
            land_area=request.land_area,
            fertilizer_cost=request.fertilizer_cost,
            pesticide_cost=request.pesticide_cost,
            irrigation_cost=request.irrigation_cost,
            state=request.state
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "ok", "model_loaded": predictor.model is not None}
