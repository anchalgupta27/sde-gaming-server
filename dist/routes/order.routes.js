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
const order_controller_1 = require("../controllers/order.controller");
const router = express_1.default.Router();
const orderController = new order_controller_1.OrderController();
router.post('/cart/checkout', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orderController.checkoutCart(req, res);
    }
    catch (error) {
        next(error);
    }
}));
router.get("/orders", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orderController.getAllOrders(req, res);
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
