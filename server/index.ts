import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// import clientRoutes from "./routes/client";
// import generalRoutes from "./routes/general";

//data import
//import Vehicle from "./models/vehicles";


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
// app.use("/client", clientRoutes);
// app.use("/general", generalRoutes);
app.use("/", require("./routes/vehicles"));

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
