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
const shops_1 = __importDefault(require("../models/shops"));
const router = express_1.default.Router();
router.route("/create-shop").post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { storeName, storePhone, storeEmail, storeAddress, storeNumber, storeCity, storePost, storeState, storeType, } = req.body;
        const newShop = new shops_1.default({
            storeName,
            storePhone,
            storeEmail,
            storeAddress,
            storeNumber,
            storeCity,
            storePost,
            storeState,
            storeType,
        });
        yield newShop.save();
        res.status(201).json({ message: "Shop added sucessfully" });
    }
    catch (error) {
        console.error("Error saving shop:", error);
        res.status(500).json({ message: "An error occurred while saving the shop" });
    }
}));
exports.default = router;
