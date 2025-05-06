import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI ?? "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('This is the root URL');
});
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
