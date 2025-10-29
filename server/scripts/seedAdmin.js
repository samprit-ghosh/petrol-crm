import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import connectDB from "../config/db.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const seed = async () => {
    try {
        const exists = await User.findOne({ email: "admin@gmail.com" });
        if (exists) {
            console.log("Admin exists");
            process.exit(0);
        }
        const hashed = await bcrypt.hash("admin123", parseInt(process.env.SALT_ROUNDS || "10", 10));
        const admin = await User.create({ name: "Super Admin", email: "admin@gmail.com", password: hashed, role: "admin" });
        console.log("Admin created:", admin.email);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();