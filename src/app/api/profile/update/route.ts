// Update profile with static data
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    await connectDB();
    
    // Find and update the first profile document
    const profile = await Profile.findOneAndUpdate(
      {},
      data,
      { new: true, upsert: true }
    );

    return NextResponse.json(profile, { 
      headers: { "Cache-Control": "no-store" } 
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" }, 
      { status: 500 }
    );
  }
}
