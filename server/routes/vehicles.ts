const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicles");

router.route("http://localhost:5173/new-vehicle/create-vehicle").post(async (req: any, res: any) => {
  try {
    const {
      vehicleName,
      vehicleTag,
      vehicleType,
      vehicleStatus,
      vehicleOwnership,
      vehicleGroup,
      vehicleBrand,
      vehicleConsume,
      vehicleLoadCap,
      vehicleOdometer,
    } = req.body;

    const newVehicle = new Vehicle({
      vehicleName,
      vehicleTag,
      vehicleType,
      vehicleStatus,
      vehicleOwnership,
      vehicleGroup,
      vehicleBrand,
      vehicleConsume,
      vehicleLoadCap,
      vehicleOdometer,
    });

    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res.status(500).json({ message: "An error occurred while saving the vehicle" });
  }
});

module.exports = router;
