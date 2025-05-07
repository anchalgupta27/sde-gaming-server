import express from "express";
import mongoose from "mongoose";
import * as dotenv from 'dotenv';
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes"

dotenv.config();

const app = express();
mongoose.connect(process.env.MONGO_URI ?? "")
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));


    mongoose.connection.once('open', async () => {
        console.log('MongoDB connected');
        await mongoose.connection.db?.collection('users').createIndex({ email: 1 }, { unique: true });
      });

app.use(express.json());
app.use('/api', userRoutes)
app.use('/api', productRoutes);
app.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});
