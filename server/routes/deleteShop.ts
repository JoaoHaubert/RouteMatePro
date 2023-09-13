import express from "express";
import Shop from "../models/shops";

const router = express.Router();

router.delete("/delete-shop/:id", async (req, res) => {
  try {
    const id = req.body.id;

    await Shop.findByIdAndDelete(id);
    res.status(200).json({ message: "Shop deleted sucessfully" });
  } catch {
    res.status(500).json({ message: "Failed to delete shop"})
  }
});

export default router;