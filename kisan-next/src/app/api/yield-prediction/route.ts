import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import YieldPrediction from "@/models/YieldPrediction";
import {
  predictYieldTF,
  AVERAGE_REGIONAL_YIELD,
} from "@/lib/ai/predictYieldTF";

export async function POST(req: Request) {
  try {
    // 1. Authenticate
    let userId: string | null = null;
    try {
      const authData = await auth();
      userId = authData.userId;
    } catch {
      // Allow unauthenticated for demo, but won't store history
    }

    // 2. Parse body
    let body: { ndvi?: number; soil_moisture?: number; rainfall?: number };
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON input" },
        { status: 400 }
      );
    }

    const { ndvi, soil_moisture, rainfall } = body;

    // 3. Validate inputs
    if (ndvi == null || soil_moisture == null || rainfall == null) {
      return NextResponse.json(
        { error: "Missing required fields: ndvi, soil_moisture, rainfall" },
        { status: 400 }
      );
    }

    if (ndvi < 0 || ndvi > 1) {
      return NextResponse.json(
        { error: "NDVI must be between 0 and 1" },
        { status: 400 }
      );
    }

    if (soil_moisture < 0 || soil_moisture > 100) {
      return NextResponse.json(
        { error: "Soil moisture must be between 0 and 100" },
        { status: 400 }
      );
    }

    if (rainfall < 0 || rainfall > 1000) {
      return NextResponse.json(
        { error: "Rainfall must be between 0 and 1000 mm" },
        { status: 400 }
      );
    }

    // 4. Run prediction
    const { predicted_yield } = await predictYieldTF({
      ndvi: Number(ndvi),
      soil_moisture: Number(soil_moisture),
      rainfall: Number(rainfall),
    });

    // 5. Store in MongoDB (if authenticated)
    if (userId) {
      try {
        await dbConnect();
        await YieldPrediction.create({
          userId,
          ndvi: Number(ndvi),
          soil_moisture: Number(soil_moisture),
          rainfall: Number(rainfall),
          predicted_yield,
        });
      } catch (dbErr) {
        console.error("Failed to store yield prediction:", dbErr);
        // Non-fatal — still return the prediction
      }
    }

    // 6. Return result
    return NextResponse.json({
      predicted_yield,
      average_regional_yield: AVERAGE_REGIONAL_YIELD,
    });
  } catch (error: unknown) {
    console.error("Yield prediction API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
