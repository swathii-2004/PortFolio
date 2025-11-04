// public-project/src/models/Skill.ts
import { Schema, model, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: "" },
    level: { type: String, default: "" },
    imageURL: { type: String, default: "" },      // ✅ Will contain Cloudinary URLs
    cloudinaryPublicId: { type: String, default: "" }, // ✅ Add this (optional, for consistency)
    icon: { type: String, default: "" },          // ✅ Legacy support
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Skill || model("Skill", SkillSchema);