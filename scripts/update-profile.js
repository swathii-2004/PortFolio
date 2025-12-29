// scripts/update-profile.js
// Run with: node scripts/update-profile.js

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

const ProfileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    bio: String,
    profileImage: String,
    cloudinaryImageId: String,
    socials: {
      github: String,
      linkedin: String,
      twitter: String,
      instagram: String,
      email: String,
      phone: String,
    },
    workExperience: [
      {
        company: String,
        position: String,
        duration: String,
        description: String,
      }
    ],
    education: [
      {
        institution: String,
        degree: String,
        year: String,
        description: String,
      }
    ],
    certifications: [String],
  },
  { timestamps: true }
);

const Profile = mongoose.model("Profile", ProfileSchema);

async function updateProfile() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    const profileData = {
      name: "swathi poojary",
      title: "Full-Stack Developer ",
      socials: {
        email: "poojaryswathi0209@gmail.com",
        linkedin: "linkedin.com/in/swathi-poojary-90891b13a1",
      },
    };

    const result = await Profile.findOneAndUpdate(
      {},
      profileData,
      { new: true, upsert: true }
    );

    console.log("✅ Profile updated successfully!");
    console.log("Updated data:", result);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating profile:", error);
    process.exit(1);
  }
}

updateProfile();
