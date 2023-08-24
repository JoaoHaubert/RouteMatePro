import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema({
  fullName: {
    type: String,
    max: 60,
    required: true,
  },
  phone: {
    type: String,
    max: 15,
    unique: true,
  },
  license: {
    type: String,
    max: 10,
    required: true,
  },
  email: {
    type: String,
    max: 50,
    unique: true,
  },
  address: {
    type: String,
    max: 40,
  },
  city: {
    type: String,
    max: 40,
  },
  postCode: {
    type: String,
    max: 20,
  },
});
