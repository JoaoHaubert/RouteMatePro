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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const client_1 = __importDefault(require("./routes/client"));
const general_1 = __importDefault(require("./routes/general"));
//Configs
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
//Routes
app.use("/client", client_1.default);
app.use("/general", general_1.default);
//Schema
const VehicleSchema = new mongoose_1.default.Schema({
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
const Vehicle = mongoose_1.default.model("Vehicle", VehicleSchema);
app.use(express_1.default.json());
//API endpoint to handle forms sub.
app.post("/vehicles", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newVehicle = new Vehicle(req.body);
        yield newVehicle.save();
        res.status(201).json({ message: "Vehicle added sucessful" });
    }
    catch (error) {
        res.status(500).json({ message: "Vehicle went wrong" });
    }
}));
//Mongoose
const PORT = parseInt(process.env.PORT || "9000");
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost2701/database";
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Server is into port: ${PORT}`));
    //add the data just once
    //User.insertMany(dataUser);
})
    .catch((error) => {
    console.error("Failed to connect mongoDB", error);
});
