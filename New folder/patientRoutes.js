import express from "express";
import Patient from "../models/Patient.js";
import { protect, authorize } from "../models/authMiddleware.js";

const router = express.Router();

// Patient add karne ki API (Admin ya Receptionist ke liye)
router.post("/add", protect, authorize("admin", "receptionist"), async (req, res) => {
  try {
    const newPatient = await Patient.create(req.body);
    res.status(201).json({ success: true, data: newPatient });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Saare patients dekhne ki API (Admin ya Doctor ke liye)
router.get("/all", protect, authorize("admin", "doctor"), async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json({ success: true, data: patients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;