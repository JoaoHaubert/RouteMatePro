"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
const vehicles_1 = __importDefault(require("../models/vehicles"));
router.route("/create-vehicle").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { vehicleName, vehicleTag, vehicleType, vehicleStatus, vehicleOwnership, vehicleGroup, vehicleBrand, vehicleConsume, vehicleLoadCap, vehicleOdometer, } = req.body;
        const newVehicle = new vehicles_1.default({
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
        yield newVehicle.save();
        res.status(201).json({ message: "Vehicle added successfully" });
    }
    catch (error) {
        console.error("Error saving vehicle:", error);
        res.status(500).json({ message: "An error occurred while saving the vehicle" });
    }
}));
module.exports = router;
