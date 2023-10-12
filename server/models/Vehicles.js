"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VehicleSchema = new mongoose_1.default.Schema({
    vehicleName: {
        type: String,
        required: true,
        unique: true,
    },
    vehicleTag: {
        type: String,
        unique: true,
    },
    vehicleType: {
        type: String,
        required: true,
    },
    vehicleStatus: {
        type: String,
    },
    vehicleOwnership: {
        type: String,
    },
    vehicleGroup: {
        type: String,
    },
    vehicleBrand: {
        type: String,
    },
    vehicleConsume: {
        type: String,
    },
    vehicleLoadCap: {
        type: String,
    },
    vehicleOdometer: {
        type: String,
    },
    vehicleOperationCost: {
        type: String,
    },
    vehicleIpva: {
        type: String,
    },
    vehicleInsurance: {
        type: String,
    },
    vehicleMaintenance: {
        type: String,
    },
}, { timestamps: true });
const Vehicle = mongoose_1.default.model("Vehicle", VehicleSchema);
exports.default = Vehicle;
