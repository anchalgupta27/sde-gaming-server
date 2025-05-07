import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    googleId: {type: String },
    roles: {type: [String], default: ['customer']}
}, { timestamps: true});

export const User = mongoose.model('User', UserSchema);