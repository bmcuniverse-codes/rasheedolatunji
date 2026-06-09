const express = require("express");
const Report = require("../models/Report");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Create incident report
router.post("/", protect, async (req, res) => {
  try {
    const { title, category, threat, description, location } = req.body;

    const report = await Report.create({
      user: req.user._id,
      title,
      category,
      threat,
      description,
      location,
      type: "Incident Report",
    });

    res.status(201).json({
      message: "Incident report submitted successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not submit report", error: error.message });
  }
});

// Create SOS alert
router.post("/sos", protect, async (req, res) => {
  try {
    const { location } = req.body;

    const report = await Report.create({
      user: req.user._id,
      title: "Emergency SOS Alert",
      category: "SOS",
      threat: "Critical",
      description: "User triggered an emergency SOS alert.",
      location,
      type: "SOS Alert",
    });

    res.status(201).json({
      message: "SOS alert sent successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not send SOS alert", error: error.message });
  }
});

// User gets own reports
router.get("/my-reports", protect, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch reports", error: error.message });
  }
});

// Admin gets all reports
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("user", "fullName email phone")
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch all reports", error: error.message });
  }
});

// Admin updates status
router.patch("/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.body;

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({
      message: "Report status updated successfully",
      report,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not update status", error: error.message });
  }
});

module.exports = router;