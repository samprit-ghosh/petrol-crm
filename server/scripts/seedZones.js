import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Zone from "../models/Zone.js";

dotenv.config();
connectDB();

const zones = [
    { name: "North Zone", description: "Covers Delhi, Haryana, Punjab, Himachal Pradesh, and Jammu & Kashmir" },
    { name: "South Zone", description: "Covers Tamil Nadu, Kerala, Karnataka, Andhra Pradesh, and Telangana" },
    { name: "East Zone", description: "Covers West Bengal, Odisha, Bihar, and Jharkhand" },
    { name: "West Zone", description: "Covers Maharashtra, Gujarat, Rajasthan, and Goa" },
    { name: "Central Zone", description: "Covers Madhya Pradesh and Chhattisgarh" },
];

const seedZones = async () => {
    try {
        await Zone.deleteMany(); // optional — clears old data
        const created = await Zone.insertMany(zones);
        console.log(`✅ ${created.length} zones added successfully!`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding zones:", err.message);
        process.exit(1);
    }
};

seedZones();