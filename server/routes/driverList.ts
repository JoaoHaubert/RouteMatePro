import express  from "express";
import Driver from "../models/drivers";

const router = express.Router();

router.get("/get-driver", async (req, res) => {
    try {
        const driver = await Driver.find();
        res.json(driver)
    } catch (error) {
        res.status(500).json({ message: "Error fetching data"})
    }
});

export default router;

