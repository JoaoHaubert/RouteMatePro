import mongoose from "mongoose";

const ShopSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      max: 30,
    },
    storePhone: {
      type: String,
      max: 15,
      unique: true,
    },
    storeEmail: {
      type: String,
      max: 50,
      unique: true,
    },
    storeAddress: {
      type: String,
      max: 40,
    },
    storeNumber: {
      type: String,
      max: 10,
    },
    storeCity: {
      type: String,
      max: 40,
    },
    storePost: {
      type: String,
      max: 20,
    },
    storeState: {
      type: String,
      max: 40,
    },
    storeType: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", ShopSchema);
export default Shop;