import express from "express";
import Vehicle from "../models/vehicles";
const router = express.Router();

router.route("/api/vehicle").post(async (req: any, res: any) => {
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
      vehicleOperationCost,
      vehicleIpva,
      vehicleInsurance,
      vehicleMaintenance,
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
      vehicleOperationCost,
      vehicleIpva,
      vehicleInsurance,
      vehicleMaintenance,
    });

    await newVehicle.save();

    res.status(201).json({ message: "Vehicle added successfully" });
  } catch (error) {
    console.error("Error saving vehicle:", error);
    res
      .status(500)
      .json({ message: "An error occurred while saving the vehicle" });
  }
});

export default router;
