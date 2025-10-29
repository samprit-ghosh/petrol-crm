import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Zone from "../models/Zone.js";
import Outlet from "../models/Outlet.js";

dotenv.config();
connectDB();

const seedOutlets = async () => {
    try {
        const zones = await Zone.find();

        if (zones.length === 0) {
            console.log("⚠️ No zones found. Please run seedZones.js first.");
            process.exit(0);
        }

        const zoneMap = {};
        zones.forEach((z) => (zoneMap[z.name.toLowerCase()] = z._id));

        const outlets = [
            {
                name: "IOCL Delhi Main Outlet",
                code: "OUT001",
                zone: zoneMap["north zone"],
                footfallType: "urban",
            },
            {
                name: "HPCL Chennai City Outlet",
                code: "OUT002",
                zone: zoneMap["south zone"],
                footfallType: "urban",
            },
            {
                name: "BPCL Kolkata Highway Outlet",
                code: "OUT003",
                zone: zoneMap["east zone"],
                footfallType: "highway",
            },
            {
                name: "IOCL Pune Rural Outlet",
                code: "OUT004",
                zone: zoneMap["west zone"],
                footfallType: "rural",
            },
            {
                name: "BPCL Bhopal Central Outlet",
                code: "OUT005",
                zone: zoneMap["central zone"],
                footfallType: "urban",
            },
        ];

        await Outlet.deleteMany(); // optional — clears existing outlets
        const created = await Outlet.insertMany(outlets);

        console.log(`✅ ${created.length} outlets added successfully!`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding outlets:", err.message);
        process.exit(1);
    }
};

seedOutlets();
