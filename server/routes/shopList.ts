import express  from "express";
import Shop from "../models/shops";

const router = express.Router();

router.get("/get-shop", async (req, res) => {
    try {
        const shop = await Shop.find();
        res.json(shop)
    } catch (error) {
        res.status(500).json({ message: "Error fetching data"})
    }
});

export default router;
