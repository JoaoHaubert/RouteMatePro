import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema ({
    vehicleName: {
        type: String,
        required: true,
    },
    vehicleTag: {
        type: String,
    },
    vehicleType: {
        type: String,
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
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema)
export default Vehicle