import mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

const Vehicle = mongoose.model("Vehicle", VehicleSchema);
export default Vehicle;
