import mongoose, { Schema, Document } from "mongoose";

export interface IPredictionHistory extends Document {
  userId: string;
  cropType: string;
  landArea: number;
  fertilizerCost: number;
  pesticideCost: number;
  irrigationCost: number;
  predictedProfit: number;
  expectedRevenue: number;
  totalCost: number;
  recommendation: string;
  mandiPrice?: number;
  timestamp: Date;
}

const PredictionHistorySchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  cropType: { type: String, required: true },
  landArea: { type: Number, required: true },
  fertilizerCost: { type: Number, required: true },
  pesticideCost: { type: Number, required: true },
  irrigationCost: { type: Number, default: 0 },
  predictedProfit: { type: Number, required: true },
  expectedRevenue: { type: Number, required: true },
  totalCost: { type: Number, required: true },
  recommendation: { type: String },
  mandiPrice: { type: Number },
  timestamp: { type: Date, default: Date.now },
});

// Clear the model from cache to ensure schema updates are applied in development
if (mongoose.models.PredictionHistory) {
  delete (mongoose as any).models.PredictionHistory;
}

export default mongoose.model<IPredictionHistory>("PredictionHistory", PredictionHistorySchema);

