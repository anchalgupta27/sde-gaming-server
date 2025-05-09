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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
class UserController {
    addNewUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = new User_1.User(req.body);
                const savedUser = yield newUser.save();
                return res.status(201).json(savedUser);
            }
            catch (err) {
                if (err.code === 11000) {
                    return res.status(400).json({ message: 'Email already exists' });
                }
                return res.status(500).send(err);
            }
        });
    }
}
exports.UserController = UserController;
