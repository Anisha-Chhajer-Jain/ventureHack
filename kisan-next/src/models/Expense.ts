import mongoose, { Schema, Document } from "mongoose";

export type ExpenseCategory = 
  | "seeds" 
  | "fertilizer" 
  | "pesticide" 
  | "irrigation" 
  | "labor" 
  | "machinery" 
  | "transport" 
  | "electricity" 
  | "animal_feed" 
  | "miscellaneous";

export interface IExpense extends Document {
  userId: string;
  date: Date;
  category: ExpenseCategory;
  itemName: string;
  amount: number;
  paymentMethod: "cash" | "digital" | "credit";
  notes?: string;
  type: "expense" | "income";
  season: 1 | 2 | 3;
  month: number;
  year: number;
}

const ExpenseSchema: Schema = new Schema({
  userId: { type: String, required: true, index: true },
  date: { type: Date, default: Date.now, required: true },
  category: { 
    type: String, 
    required: true,
    enum: [
      "seeds", "fertilizer", "pesticide", "irrigation", "labor", 
      "machinery", "transport", "electricity", "animal_feed", "miscellaneous"
    ]
  },
  itemName: { type: String, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    required: true,
    enum: ["cash", "digital", "credit"]
  },
  notes: { type: String },
  type: { 
    type: String, 
    required: true,
    enum: ["expense", "income"],
    default: "expense"
  },
  season: { type: Number, required: true, enum: [1, 2, 3] },
  month: { type: Number, required: true, min: 1, max: 12 },
  year: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.Expense || mongoose.model<IExpense>("Expense", ExpenseSchema);
