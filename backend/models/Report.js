const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    threat: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Medium",
    },

    description: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["Incident Report", "SOS Alert"],
      default: "Incident Report",
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    status: {
      type: String,
      enum: ["Pending", "Investigating", "Resolved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);              