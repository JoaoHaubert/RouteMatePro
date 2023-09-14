import express from "express";
import Driver from "../models/drivers";

const router = express.Router();

router.delete("/delete-driver/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await Driver.deleteOne({ _id: id });
    res.status(200).json({ message: "Driver deleted sucessfully" });
  } catch (error) {
    console.error("Error deleting driver:", error)
    res.status(500).json({ message: "Failed to delete driver" });
  }
});

export default router;
