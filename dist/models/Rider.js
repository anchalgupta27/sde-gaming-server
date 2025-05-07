"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const riderSchema = new mongoose_1.default.Schema({
    orderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order', required: true },
    riderId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
        type: String,
        enum: ['assigned', 'picked-up', 'delivered'],
        default: 'assigned'
    },
    assignedAt: { type: Date, default: Date.now },
    deliveredAt: Date
}, { timestamps: true });
exports.default = mongoose_1.default.models.Rider || mongoose_1.default.model('Rider', riderSchema);
