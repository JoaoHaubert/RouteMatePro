const express = require("express");
const router = express.Router();
const Vehicle = require("../models/Vehicles")

router.router("/create-vehicle").post((req: any, res: any) => {
    const vehicleName = req.body.vehicleName
    const vehicleTag = req.body.vehicleTag
    const vehicleType = req.body.vehicleType
    const vehicleStatus = req.body.vehicleStatus
    const vehicleOwnership = req.body.vehicleOwnership
    const vehicleGroup = req.body.vehicleGroup
    const vehicleBrand = req.body.vehicleBrand
    const vehicleConsume = req.body.vehicleConsume
    const vehicleLoadCap = req.body.vehicleLoadCap
    const vehicleOdometer = req.body.vehicleOdometer
    const newVehicle = new Vehicle ({
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

    newVehicle.save();
})