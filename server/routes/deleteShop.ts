import express from "express";
import Shop from "../models/shops";

const router = express.Router();

router.delete("/delete-shop/:id", async (req, res) => {
  try {
    const id = req.params.id; // Use req.params to get the ID from the URL parameter

    await Shop.deleteOne({ _id: id });
    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    res.status(500).json({ message: "Failed to delete shop" });
  }
});

export default router;
