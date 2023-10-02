import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import vehicleRoutes from "./routes/vehicles";
import driverRoutes from "./routes/drivers";
import shopRoutes from "./routes/shops";
import vehicleList from "./routes/vehicleList";
import driverList from "./routes/driverList";
import shopList from "./routes/shopList";
import vehicleDelete from "./routes/deleteVehicle";
import driverDelete from "./routes/deleteDriver";
import shopDelete from "./routes/deleteShop";
import driverUpdate from "./routes/updateDriver"
import shopUpdate from "./routes/updateShop"

//Configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//Routes
app.use(vehicleRoutes);
app.use(driverRoutes);
app.use(shopRoutes);
app.use(vehicleList);
app.use(driverList);
app.use(shopList);
app.use(vehicleDelete);
app.use(driverDelete);
app.use(shopDelete);
app.use(driverUpdate)
app.use(shopUpdate);

//Mongoose
const PORT: number = parseInt(process.env.PORT || "9000");
const MONGO_URL: string =
  process.env.MONGO_URL || "mongodb://localhost:27017/database";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
