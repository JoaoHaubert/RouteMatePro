import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import vehicleRoutes from "./routes/vehicles"
import driverRoutes from "./routes/drivers"
import shopRoutes from "./routes/shops"


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
app.use("/", vehicleRoutes);
app.use("/", driverRoutes);
app.use("/", shopRoutes);

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
