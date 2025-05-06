import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    googleId: {type: String },
    roles: {type: [String], default: ['customer']}
}, { timestamps: true});

export default mongoose.models.User || mongoose.model('User', userSchema);