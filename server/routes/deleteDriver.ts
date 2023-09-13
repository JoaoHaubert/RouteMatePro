import express from "express";
import Driver from "../models/drivers";

const router = express.Router();

router.delete("/delete-driver/:id", async (req, res) => {
  try {
    const id = req.body.id;

    await Driver.deleteOne(id);
    res.status(200).json({ message: "Driver deleted sucessfully" });
  } catch {
    res.status(200).json({ message: "Failed to delete driver" });
  }
});

export default router;
