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
    } catch (authErr: any) {
      console.error("Clerk Auth Error:", authErr);
      return NextResponse.json({ 
        error: "Authentication service error", 
        details: authErr.message 
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
    } catch (parseErr: any) {
      console.error("JSON Parse Error:", parseErr);
      return NextResponse.json({ 
        error: "Invalid JSON input", 
        details: parseErr.message 
      }, { status: 400 });
    }

    const { 
      cropType, 
      landArea, 
      soilNitrogen, 
      soilPhosphorus, 
      soilPotassium, 
      rainfall, 
      fertilizerUsed,
      mandi = "Chittorgarh"
    } = body;

    // 1. Get AI Prediction from FastAPI Microservice
    console.log("Calling FastAPI Yield Predictor...");
    try {
      const mlResponse = await fetch("http://127.0.0.1:8000/predict-yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: cropType,
          nitrogen: Number(soilNitrogen),
          phosphorus: Number(soilPhosphorus),
          potassium: Number(soilPotassium),
          rainfall: Number(rainfall),
          temperature: 25.0, // Default for now, can be updated in form
          soil_ph: 6.5,      // Default for now, can be updated in form
          state: "Rajasthan" // Default
        })
      });
      
      if (!mlResponse.ok) {
        throw new Error(`ML API Error: ${mlResponse.statusText}`);
      }
      
      const mlData = await mlResponse.json();
      
      // The ML model predicts per hectare yield. 
      // Calculate total yield based on land area.
      var predictedYield = mlData.predicted_yield * Number(landArea);
      var confidenceScore = mlData.confidence;
      
      console.log(`ML Prediction: ${predictedYield} (Confidence: ${confidenceScore})`);
      
    } catch (mlErr: any) {
      console.error("FastAPI Prediction Error:", mlErr);
      return NextResponse.json({ 
        error: "AI Service Error", 
        details: mlErr.message 
      }, { status: 503 });
    }

    // 2. Get Market Price
    console.log("Connecting to DB and fetching price...");
    await dbConnect();
    
    // Check if we need to seed
    const MarketPrice = (await import("@/models/MarketPrice")).default;
    const count = await MarketPrice.countDocuments();
    if (count === 0) {
      console.log("Database empty, seeding market prices...");
      const { seedMarketPrices } = await import("@/lib/apmc/marketData");
      await seedMarketPrices();
    }

    const pricePerQuintal = await getMarketPrice(cropType, mandi);

    // 3. Calculate Profit Estimation
    const estimatedRevenue = predictedYield * pricePerQuintal;
    const fertilizerCost = Number(fertilizerUsed) * 10 * Number(landArea); 
    const netProfit = estimatedRevenue - fertilizerCost;

    // 4. Store in DB
    console.log("Creating DB record...");
    const predictionRecord = await PredictionHistory.create({
      userId,
      cropType,
      landArea: Number(landArea),
      soilNitrogen: Number(soilNitrogen),
      soilPhosphorus: Number(soilPhosphorus),
      soilPotassium: Number(soilPotassium),
      rainfall: Number(rainfall),
      fertilizerUsed: Number(fertilizerUsed),
      predictedYield,
      mandiPrice: pricePerQuintal,
      estimatedRevenue,
      fertilizerCost,
      netProfit,
    });

    console.log("POST /api/predict-yield - Success");
    return NextResponse.json({
      predictedYield,
      confidenceScore,
      pricePerQuintal,
      estimatedRevenue,
      fertilizerCost,
      netProfit,
      historyId: predictionRecord._id,
    });
  } catch (error: any) {
    console.error("GLOBAL API ERROR:", error);
    return NextResponse.json({ 
      error: "Internal Server Error", 
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    }, { status: 500 });
  }
}
