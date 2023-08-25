"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DriverSchema = new mongoose_1.default.Schema({
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
    state: {
        type: String,
        max: 40,
    },
    birthDate: String,
    id: {
        type: String,
        max: 20,
    },
    number: {
        type: String,
        max: 10,
        required: true,
    },
    complement: {
        type: String,
        max: 40,
    },
}, { timestamps: true });
const Driver = mongoose_1.default.model("Driver", DriverSchema);
exports.default = Driver;
