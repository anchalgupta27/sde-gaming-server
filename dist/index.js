"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const cors_1 = __importDefault(require("cors"));
dotenv.config();
const app = (0, express_1.default)();
mongoose_1.default.connect((_a = process.env.MONGO_URI) !== null && _a !== void 0 ? _a : "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
mongoose_1.default.connection.once('open', () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('MongoDB connected');
    yield ((_a = mongoose_1.default.connection.db) === null || _a === void 0 ? void 0 : _a.collection('users').createIndex({ email: 1 }, { unique: true }));
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use('/api', user_routes_1.default);
app.use('/api', product_routes_1.default);
app.use("/api", cart_routes_1.default);
app.use('/api', auth_routes_1.default);
app.use('/api', order_routes_1.default);
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
