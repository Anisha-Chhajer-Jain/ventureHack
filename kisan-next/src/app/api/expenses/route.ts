import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectToDatabase from "@/lib/mongodb";
import Expense from "@/models/Expense";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    // Fetch all expenses for the user, sort by date descending
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    return NextResponse.json({ expenses }, { status: 200 });
  } catch (error) {
    console.error("GET Expenses Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    // Extract year, month from date
    const expenseDate = data.date ? new Date(data.date) : new Date();
    
    // Validate required fields
    if (!data.itemName || !data.amount || !data.category || !data.type || !data.season) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectToDatabase();
    
    // Create new expense record
    const newExpense = new Expense({
      userId,
      date: expenseDate,
      category: data.category,
      itemName: data.itemName,
      amount: data.amount,
      paymentMethod: data.paymentMethod || "cash",
      notes: data.notes || "",
      type: data.type,
      season: data.season,
      month: expenseDate.getMonth() + 1, // 1-12
      year: expenseDate.getFullYear(),
    });

    const savedExpense = await newExpense.save();
    return NextResponse.json({ expense: savedExpense }, { status: 201 });
  } catch (error) {
    console.error("POST Expense Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
