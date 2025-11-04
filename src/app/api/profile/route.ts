// public-project/src/app/api/profile/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne({});
    // No caching to ensure latest admin changes are visible
    return NextResponse.json(profile || {}, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
