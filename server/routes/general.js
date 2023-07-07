"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const general_1 = require("../controllers/general");
const router = express_1.default.Router();
router.get("/user/:id", general_1.getUser);
exports.default = router;