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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const google_auth_library_1 = require("google-auth-library");
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const ApprovedEmail_1 = __importDefault(require("../models/ApprovedEmail"));
dotenv.config();
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const JWT_SECRET = process.env.JWT_SECRET;
class AuthController {
    authorizeGoogleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { credential } = req.body;
            if (!credential) {
                return res.status(400).json({ error: "Missing Google credential" });
            }
            try {
                const ticket = yield client.verifyIdToken({
                    idToken: credential,
                    audience: process.env.GOOGLE_CLIENT_ID,
                });
                const payload = ticket.getPayload();
                if (!payload || !payload.email || !payload.given_name) {
                    return res.status(400).json({ error: "Missing user info in token" });
                }
                const { email, given_name, family_name } = payload;
                console.log(payload);
                console.log(yield ApprovedEmail_1.default.find());
                const approvedEmail = yield ApprovedEmail_1.default.findOne({ email });
                console.log(approvedEmail);
                if (!approvedEmail) {
                    return res.status(403).json({ error: "Email not approved for login" });
                }
                let user = yield User_1.User.findOne({ email });
                if (!user) {
                    user = yield User_1.User.create({
                        email,
                        name: `${given_name} ${family_name !== null && family_name !== void 0 ? family_name : ""}`,
                        googleId: payload.sub,
                    });
                }
                const token = jsonwebtoken_1.default.sign({ userId: user._id, email: user.email }, JWT_SECRET, {
                    expiresIn: "24h",
                });
                return res.status(200).json({
                    message: "Authentication successful",
                    token,
                    user,
                });
            }
            catch (err) {
                console.error("Google login error:", err);
                return res.status(401).json({ error: "Invalid token" });
            }
        });
    }
}
exports.AuthController = AuthController;
