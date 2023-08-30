import express  from "express";
import Vehicle from "../models/vehicles";

const router = express.Router();

router.get("/create-vehicle", async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles)
    } catch (error) {
        res.status(500).json({ message: "Error fetching data"})
    }
});

export default router;

