import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import connectDB from '@/lib/mongodb';
import { FarmerCrop } from '@/models/FarmerCrop';
import { sendSMS } from '@/lib/sendSMS';

// GET all crops for the logged-in user
export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const crops = await FarmerCrop.find({ farmerId: userId }).sort({ createdAt: -1 });

    return NextResponse.json(crops, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching farmer crops:", error);
    return NextResponse.json({ error: "Failed to fetch crops" }, { status: 500 });
  }
}

// POST a new crop
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { cropType, plantationDate, landArea, location, phoneNumber } = body;

    // Validate inputs
    if (!cropType || !plantationDate || !landArea || !location || !phoneNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const newCrop = await FarmerCrop.create({
      farmerId: userId,
      cropType,
      plantationDate: new Date(plantationDate),
      landArea: Number(landArea),
      location,
      phoneNumber,
    });

    // Send a welcome SMS to confirm enrollment
    const welcomeMessage = `Welcome to KisanDost SMS Advisory! You will now receive automated pesticide and fertilizer alerts for your ${landArea}-acre ${cropType} crop.`;
    await sendSMS(phoneNumber, welcomeMessage);

    return NextResponse.json(newCrop, { status: 201 });
  } catch (error: any) {
    console.error("Error creating farmer crop:", error);
    return NextResponse.json({ error: "Failed to save crop data" }, { status: 500 });
  }
}
