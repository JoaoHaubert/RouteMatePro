import express from "express";
import Driver from "../models/drivers";
const router = express.Router();

router.route("/api/driver").post(async (req: any, res: any) => {
  try {
    const {
      fullName,
      phone,
      license,
      email,
      address,
      city,
      postCode,
      state,
      birthDate,
      id,
      number,
      complement,
    } = req.body;

    const newDriver = new Driver({
      fullName,
      phone,
      license,
      email,
      address,
      city,
      postCode,
      state,
      birthDate,
      id,
      number,
      complement,
    });

    await newDriver.save();

    res.status(201).json({ message: "Driver added sucessfully" });
  } catch (error) {
    console.error("Error saving driver:", error);
    res.status(500).json({ message: "An error occurred while saving" });
  }
});

export default router;