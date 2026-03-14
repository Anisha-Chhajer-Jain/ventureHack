"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function saveOnboardingData(data: {
  clerkId: string;
  name: string;
  mobile: string;
  village: string;
  district: string;
  mainCrop: string;
}) {
  await dbConnect();
  
  try {
    const existingUser = await User.findOne({ clerkId: data.clerkId });
    if (existingUser) {
      existingUser.mobile = data.mobile;
      existingUser.village = data.village;
      existingUser.district = data.district;
      existingUser.mainCrop = data.mainCrop;
      await existingUser.save();
    } else {
      await User.create(data);
    }
  } catch (error) {
    console.error("Error saving onboarding data", error);
    throw new Error("Failed to save data");
  }
}

export async function checkUserExists(clerkId: string) {
  await dbConnect();
  try {
    const user = await User.findOne({ clerkId });
    // Check if user exists and has finished onboarding (e.g. mobile is not the default value used in webhook)
    if (user && user.mobile !== "Needs Update" && user.mobile) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error checking user", error);
    return false;
  }
}
