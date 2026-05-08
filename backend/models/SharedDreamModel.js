import mongoose from "mongoose";

const sharedDreamSchema = new mongoose.Schema(
  {
    theme: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      city: {
        type: String,
        required: true,
        index: true,
      },
      area: {
        type: String,
        default: null,
      },
      coordinates: {
        latitude: Number,
        longitude: Number,
      },
    },
    keywords: [String],
    // Users who reported this shared dream
    userIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userCount: {
      type: Number,
      default: 1,
      index: true,
    },
    // Associated post IDs
    postIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    // How confident we are this is a shared dream (0-100%)
    confidence: {
      type: Number,
      default: 50,
      min: 0,
      max: 100,
    },
    // Time pattern info
    detectedTime: {
      type: Date,
      default: Date.now,
      index: true,
    },
    peakTime: {
      hour: Number,
      dayOfWeek: Number,
    },
    // Status: active, archived, disputed
    status: {
      type: String,
      enum: ["active", "archived", "disputed"],
      default: "active",
      index: true,
    },
    // Common elements in these dreams
    commonElements: [
      {
        element: String,
        frequency: Number,
      },
    ],
    // Emotional tone
    emotionalTone: {
      type: String,
      enum: ["positive", "negative", "neutral", "mixed"],
      default: "neutral",
    },
    notes: String,
  },
  { timestamps: true }
);

// Index for finding shared dreams by theme and location
sharedDreamSchema.index({ theme: 1, location: 1 });
sharedDreamSchema.index({ detectedTime: -1 });
sharedDreamSchema.index({ userCount: -1 });

const SharedDream = mongoose.model("SharedDream", sharedDreamSchema);

export default SharedDream;
