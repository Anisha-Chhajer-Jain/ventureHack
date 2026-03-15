import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import { FarmerCrop } from '@/models/FarmerCrop';
import { SmsLog } from '@/models/SmsLog';
import { sendSMS } from '@/lib/sendSMS';
import { calculateDaysAfterSowing, getActiveAdvisory } from '@/lib/cropStage';

export async function GET(req: Request) {
  try {
    await connectDB();

    console.log('[CRON] Starting daily crop advisory processing at 6 AM...');
    const crops = await FarmerCrop.find({});
    let smsSentCount = 0;
    
    for (const crop of crops) {
      const daysAfterSowing = calculateDaysAfterSowing(crop.plantationDate);

      // Find matching active advisory
      const advisory = await getActiveAdvisory(crop.cropType, daysAfterSowing);

      if (!advisory) continue;

      // Prevent duplicate alerts in same stage
      if (crop.lastAdvisorySent === advisory.stageName) {
        continue;
      }

      // Dosage calculation: totalDosage = dosagePerAcre * landArea
      const totalDosage = advisory.dosagePerAcre * crop.landArea;
      
      const message = advisory.messageTemplate
        .replace('{{dosage}}', totalDosage.toString())
        .replace('{{pesticide}}', advisory.pesticideName)
        .replace('{{stage}}', advisory.stageName);
        
      const smsResult = await sendSMS(crop.phoneNumber, message);

      if (smsResult.success) {
        // Update lastAdvisorySent to prevent duplicates
        await FarmerCrop.findByIdAndUpdate(crop._id, {
          lastAdvisorySent: advisory.stageName
        });

        // Log to SmsLog for historical tracking
        await SmsLog.create({
          farmerCropId: crop._id,
          advisoryId: advisory._id,
          phoneNumber: crop.phoneNumber,
          status: 'success',
          messageBody: message,
        });

        smsSentCount++;
      } else {
        await SmsLog.create({
          farmerCropId: crop._id,
          advisoryId: advisory._id,
          phoneNumber: crop.phoneNumber,
          status: 'failed',
          messageBody: message,
        });
      }
    }

    console.log(`[CRON] Complete. Dispatched ${smsSentCount} advisories.`);
    return NextResponse.json({ 
      success: true, 
      smsSent: smsSentCount 
    }, { status: 200 });

  } catch (error: any) {
    console.error("[CRON] Fatal Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
