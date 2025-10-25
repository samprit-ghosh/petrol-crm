import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";
import Sale from "../models/Sale.js";

dotenv.config();
connectDB();

const deleteSales = async () => {
    try {
        const outlets = await Outlet.find();

        if (outlets.length === 0) {
            console.log("⚠️ No outlets found. Please run seedOutlets.js first.");
            process.exit(0);
        }

        // Clear old data
        await Sale.deleteMany();
        console.log("🗑️ Old sales data cleared.");
        console.log(`✅ Ready to seed sales data for ${outlets.length} outlets.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error deleting sales:", err.message);
        process.exit(1);
    }
};

deleteSales();
