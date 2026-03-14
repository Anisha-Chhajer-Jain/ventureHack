import mongoose, { Schema, Document } from "mongoose";

export interface IPredictionHistory extends Document {
  userId: string;
  cropType: string;
  landArea: number;
  soilNitrogen: number;
  soilPhosphorus: number;
  soilPotassium: number;
  rainfall: number;
  fertilizerUsed: number;
  predictedYield: number;
  mandiPrice: number;
  estimatedRevenue: number;
  fertilizerCost: number;
  netProfit: number;
  timestamp: Date;
}

const PredictionHistorySchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  cropType: { type: String, required: true },
  landArea: { type: Number, required: true },
  soilNitrogen: { type: Number, required: true },
  soilPhosphorus: { type: Number, required: true },
  soilPotassium: { type: Number, required: true },
  rainfall: { type: Number, required: true },
  fertilizerUsed: { type: Number, required: true },
  predictedYield: { type: Number, required: true },
  mandiPrice: { type: Number, required: true },
  estimatedRevenue: { type: Number, required: true },
  fertilizerCost: { type: Number, required: true },
  netProfit: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.PredictionHistory || mongoose.model<IPredictionHistory>("PredictionHistory", PredictionHistorySchema);
