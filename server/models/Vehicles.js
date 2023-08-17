import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema ({
    vehicleName: String,
    vehicleTag: String,
    vehicleType: String,
    vehicleStatus: String,
    vehicleOwnership: String,
    vehicleGroup: String,
    vehicleBrand: String,
    vehicleConsume: String,
    vehicleLoadCap: String,
    vehicleOdometer: String,
});

const Vehicle = mongoose.model("Vehicle", VehicleSchema)
export default Vehicle