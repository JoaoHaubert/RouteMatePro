import express from "express";
import Vehicle from "../models/vehicles";

const router = express.Router();

router.delete("/delete-vehicle/:id", async (req, res) => {
  try {
    const id = req.body._id;

    await Vehicle.deleteOne(id);
    res.status(200).json({ message: "Vehicle deleted sucessfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete vehicle" });
  }
});

export default router