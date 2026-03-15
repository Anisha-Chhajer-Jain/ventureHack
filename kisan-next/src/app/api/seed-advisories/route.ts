import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { CropAdvisory } from '@/models/CropAdvisory';

export async function GET() {
  try {
    await connectDB();

    const cottonAdvisories = [
      {
        cropType: "cotton",
        stageName: "Seedling Stage",
        daysAfterSowingStart: 0,
        daysAfterSowingEnd: 15,
        pesticideName: "Thiamethoxam 25% WG",
        dosagePerAcre: 40,
        purpose: "To control early sucking pests like Jassids and Aphids.",
        messageTemplate: "KisanDost Alert: Your cotton is in the Seedling phase. Spray {{dosage}}g of {{pesticide}} to protect against Jassids."
      },
      {
        cropType: "cotton",
        stageName: "Vegetative Stage",
        daysAfterSowingStart: 16,
        daysAfterSowingEnd: 45,
        pesticideName: "Imidacloprid 17.8% SL",
        dosagePerAcre: 80,
        purpose: "Dose to control Whiteflies and Thrips.",
        messageTemplate: "KisanDost Alert: Protect your vegetative cotton! Spray {{dosage}}ml of {{pesticide}} today."
      },
      {
        cropType: "cotton",
        stageName: "Square Formation",
        daysAfterSowingStart: 46,
        daysAfterSowingEnd: 75,
        pesticideName: "Spinosad 45% SC",
        dosagePerAcre: 75,
        purpose: "To control Bollworms (Spotted, Pink).",
        messageTemplate: "KisanDost Alert: Cotton is entering square formation. Spray {{dosage}}ml {{pesticide}} to prevent Bollworm damage."
      },
      {
        cropType: "cotton",
        stageName: "Flowering & Boll Development",
        daysAfterSowingStart: 76,
        daysAfterSowingEnd: 120,
        pesticideName: "Emamectin Benzoate 5% SG",
        dosagePerAcre: 100,
        purpose: "Control severe Pink Bollworm infestation.",
        messageTemplate: "KisanDost Alert: Protect developing bolls. Spray {{dosage}}g {{pesticide}} to ensure a healthy yield."
      }
    ];

    const wheatAdvisories = [
      {
        cropType: "wheat",
        stageName: "Crown Root Initiation",
        daysAfterSowingStart: 21,
        daysAfterSowingEnd: 25,
        pesticideName: "Pendimethalin 30% EC",
        dosagePerAcre: 400,
        purpose: "Pre-emergence grass & broadleaf weed control. Irrigate field.",
        messageTemplate: "KisanDost Alert: Protect your wheat at CRI stage. Apply {{dosage}}ml {{pesticide}} to control weeds and begin 1st irrigation."
      },
      {
        cropType: "wheat",
        stageName: "Tillering Stage",
        daysAfterSowingStart: 40,
        daysAfterSowingEnd: 55,
        pesticideName: "Tebuconazole 25.9% EC",
        dosagePerAcre: 250,
        purpose: "Preventative action against Yellow Rust.",
        messageTemplate: "KisanDost Alert: Wheat tillering has begun. Prevent rust diseases with {{dosage}}ml {{pesticide}}."
      }
    ];

    // Delete existing to prevent duplication
    await CropAdvisory.deleteMany({ cropType: { $in: ["cotton", "wheat"] } });

    // Seed the DB
    await CropAdvisory.insertMany([...cottonAdvisories, ...wheatAdvisories]);

    return NextResponse.json({ message: "Database seeded successfully with Cotton and Wheat advisories." });
  } catch (error: any) {
    console.error("Failed to seed DB:", error);
    return NextResponse.json({ error: "DB Seeding failed" }, { status: 500 });
  }
}
