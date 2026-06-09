const express = require("express");
const Contact = require("../models/Contact");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Add emergency contact
router.post("/", protect, async (req, res) => {
  try {
    const { name, relationship, phone } = req.body;

    const contact = await Contact.create({
      user: req.user._id,
      name,
      relationship,
      phone,
    });

    res.status(201).json({
      message: "Emergency contact added successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Could not add contact", error: error.message });
  }
});

// Get user contacts
router.get("/", protect, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch contacts", error: error.message });
  }
});

// Delete contact
router.delete("/:id", protect, async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete contact", error: error.message });
  }
});

module.exports = router;