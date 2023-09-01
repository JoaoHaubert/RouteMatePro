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
const drivers_1 = __importDefault(require("../models/drivers"));
const router = express_1.default.Router();
router.route("/api/driver").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, phone, license, email, address, city, postCode, state, birthDate, id, number, complement, } = req.body;
        const newDriver = new drivers_1.default({
            fullName,
            phone,
            license,
            email,
            address,
            city,
            postCode,
            state,
            birthDate,
            id,
            number,
            complement,
        });
        yield newDriver.save();
        res.status(201).json({ message: "Driver added sucessfully" });
    }
    catch (error) {
        console.error("Error saving driver:", error);
        res.status(500).json({ message: "An error occurred while saving" });
    }
}));
exports.default = router;
