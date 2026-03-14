import mongoose, { Schema, Document } from "mongoose";

export interface IYieldPrediction extends Document {
  userId: string;
  ndvi: number;
  soil_moisture: number;
  rainfall: number;
  predicted_yield: number;
  createdAt: Date;
}

const YieldPredictionSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  ndvi: { type: Number, required: true },
  soil_moisture: { type: Number, required: true },
  rainfall: { type: Number, required: true },
  predicted_yield: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.YieldPrediction ||
  mongoose.model<IYieldPrediction>("YieldPrediction", YieldPredictionSchema);
