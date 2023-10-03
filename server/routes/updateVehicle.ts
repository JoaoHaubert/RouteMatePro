import express from "express";
import Vehicle from "../models/vehicles";

const router = express.Router();

router.put('/update-vehicle/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;

    await Vehicle.updateOne({ _id: id }, updatedData);

    res.status(200).json({ message: "Vehicle updated sucessfuly." });
  } catch (error) {
    console.error("Error updating vehicle data:", error);
    res.status(500).json({ message: "Failed to update shop." });
  }
});

export default router;