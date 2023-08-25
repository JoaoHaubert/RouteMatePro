"use strict";
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
// import clientRoutes from "./routes/client";
// import generalRoutes from "./routes/general";
const vehicles_1 = __importDefault(require("./routes/vehicles"));
// import driverRoutes from "./routes/drivers"
// import shopRoutes from "./routes/shops"
//data import
//import Vehicle from "./models/vehicles";
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
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
app.use("/", vehicles_1.default);
//API endpoint to handle forms submission.
// app.post("/create-vehicle", async (req, res) => {
//   try {
//     const newVehicle = new Vehicle(req.body);
//     await newVehicle.save();
//     res.status(201).json({ message: "Vehicle added successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Vehicle went wrong" });
//   }
// });
//Mongoose
const PORT = parseInt(process.env.PORT || "9000");
const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/database";
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => {
    app.listen(PORT, () => console.log(`Server is on port: ${PORT}`));
})
    .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
});
