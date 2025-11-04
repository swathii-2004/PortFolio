// public-project/src/models/Project.ts
import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
    techStack: { type: [String], default: [] },
    imageURL: { type: String, default: "" }, // Thumbnail
    images: { type: [String], default: [] }, // All Cloudinary URLs
    cloudinaryPublicIds: { type: [String], default: [] }, // ✅ For consistency
    githubLink: { type: String, default: "" },
    liveLink: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default models.Project || model("Project", ProjectSchema);