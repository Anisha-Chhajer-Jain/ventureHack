import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import PredictionHistory from "@/models/PredictionHistory";

import { getMarketPrice } from "@/lib/apmc/marketData";

export async function POST(req: Request) {
  try {
    console.log("POST /api/predict-yield - Entry");
    
    // Test auth
    let authData;
    try {
      authData = await auth();
      console.log("Auth check passed:", !!authData.userId);
    } catch (authErr) {
      const err = authErr as Error;
      console.error("Clerk Auth Error:", err);
      return NextResponse.json({ 
        error: "Authentication service error", 
        details: err.message 
      }, { status: 401 });
    }

    const { userId } = authData;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized: Please login" }, { status: 401 });
    }

    // Parse body safely
    let body;
    try {
      body = await req.json();
      console.log("Body parsed successfully");
    } catch (parseErr) {
      const err = parseErr as Error;
      console.error("JSON Parse Error:", err);
      return NextResponse.json({ 
        error: "Invalid JSON input", 
        details: err.message 
      }, { status: 400 });
    }

    const { 
      cropType, 
      landArea, 
      fertilizerCost, 
      pesticideCost, 
      irrigationCost = 0,
      mandi = "Chittorgarh"
    } = body;

    // 1. Get AI Prediction from FastAPI Microservice
    console.log("Calling FastAPI Profit Predictor...");
    let mlData;
    try {
      const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
      const mlResponse = await fetch(`${backendUrl}/predict-yield`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: cropType,
          land_area: Number(landArea),
          fertilizer_cost: Number(fertilizerCost),
          pesticide_cost: Number(pesticideCost),
          irrigation_cost: Number(irrigationCost),
          state: "Rajasthan" 
        })
      });
      
      if (!mlResponse.ok) {
        throw new Error(`ML API Error: ${mlResponse.statusText}`);
      }
      
      mlData = await mlResponse.json();
      console.log(`ML Prediction Success: Profit ₹${mlData.predicted_profit}`);
      
    } catch (mlErr: any) {
      console.error("FastAPI Prediction Error:", mlErr);
      return NextResponse.json({ 
        error: "AI Service Error", 
        details: mlErr.message 
      }, { status: 503 });
    }

    // 2. Get Market Price (Optional/Fallback info)
    console.log("Connecting to DB...");
    await dbConnect();
    
    let pricePerQuintal = 0;
    try {
      const { getMarketPrice } = await import("@/lib/apmc/marketData");
      pricePerQuintal = await getMarketPrice(cropType, mandi);
    } catch (e) {
      console.warn("Could not fetch market price, continuing...");
    }

    // 3. Store in DB
    console.log("Creating DB record...");
    const predictionRecord = await PredictionHistory.create({
      userId,
      cropType,
      landArea: Number(landArea),
      fertilizerCost: Number(fertilizerCost),
      pesticideCost: Number(pesticideCost),
      irrigationCost: Number(irrigationCost),
      predictedProfit: mlData.predicted_profit,
      expectedRevenue: mlData.expected_revenue,
      totalCost: mlData.total_cost,
      recommendation: mlData.recommendation,
      mandiPrice: pricePerQuintal,
    });

    console.log("POST /api/predict-yield - Success");
    return NextResponse.json({
      predictedProfit: mlData.predicted_profit,
      expectedRevenue: mlData.expected_revenue,
      totalCost: mlData.total_cost,
      recommendation: mlData.recommendation,
      confidenceScore: mlData.confidence,
      pricePerQuintal,
      historyId: predictionRecord._id,
    });
  } catch (error) {
    const err = error as Error;
    console.error("GLOBAL API ERROR:", err);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    }, { status: 500 });
  }
}
