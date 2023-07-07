import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client";
import generalRoutes from "./routes/general";
//data import
import User from "./models/User";
import { dataUser } from "./data/index";

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
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);

//Mongoose
const PORT: number = parseInt(process.env.PORT || "9000");
const MONGO_URL: string =
  process.env.MONGO_URL || "mongodb://localhost2701/database";
mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server is into port: ${PORT}`));
    //add the data just once
    //User.insertMany(dataUser);
  })
  .catch((error) => {
    console.error("Failed to connect mongoDB", error);
  });
