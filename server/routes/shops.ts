import express from "express";
import Shop from "../models/shops";
const router = express.Router();

router.route("/create-shop").post(async (req: any, res: any) => {
    try {
        const {
            storeName,
            storePhone,
            storeEmail,
            storeAddress,
            storeNumber,
            storeCity,
            storePost,
            storeState,
            storeType,
        } = req.body;

        const newShop = new Shop({
            storeName,
            storePhone,
            storeEmail,
            storeAddress,
            storeNumber,
            storeCity,
            storePost,
            storeState,
            storeType,
        });

        await newShop.save();

        res.status(201).json({ message: "Shop added sucessfully" });
    } catch (error) {
        console.error("Error saving shop:", error);
        res.status(500).json({ message: "An error occurred while saving the shop" });
    }
});

export default router;