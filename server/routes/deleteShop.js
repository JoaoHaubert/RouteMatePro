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
router.delete("/delete-shop/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id; // Use req.params to get the ID from the URL parameter
        yield shops_1.default.deleteOne({ _id: id });
        res.status(200).json({ message: "Shop deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting shop:", error);
        res.status(500).json({ message: "Failed to delete shop" });
    }
}));
exports.default = router;
