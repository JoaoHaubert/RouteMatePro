"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ShopSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Shop = mongoose_1.default.model("Shop", ShopSchema);
exports.default = Shop;
