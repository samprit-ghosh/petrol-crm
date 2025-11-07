import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/db.js";
import Outlet from "../models/Outlet.js";
import Sale from "../models/Sale.js";

dotenv.config({ path: "../.env" });
connectDB();

const seedSales = async () => {
    try {
        const outlets = await Outlet.find();

        if (outlets.length === 0) {
            console.log("⚠️ No outlets found. Please run seedOutlets.js first.");
            process.exit(0);
        }

        // 🔧 Settings
        const startDate = new Date("2024-01-01");
        const endDate = new Date("2025-10-01");
        const salesPerMonth = 3; // e.g. 3 sample records per month per outlet

        // Clear old data
        await Sale.deleteMany();

        const sales = [];
        for (const outlet of outlets) {
            let currentDate = new Date(startDate);

            while (currentDate <= endDate) {
                for (let i = 0; i < salesPerMonth; i++) {
                    // Random realistic data (values in KL or litres)
                    const petrol_standard = Math.floor(Math.random() * 2000 + 500);
                    const diesel_standard = Math.floor(Math.random() * 2000 + 500);
                    const premium_products = Math.floor(Math.random() * 500 + 100);
                    const lube_sales = Math.floor(Math.random() * 100 + 10);
                    const additive_sales = Math.floor(Math.random() * 50 + 5);

                    sales.push({
                        outlet: outlet._id,
                        date: new Date(currentDate),
                        petrol_standard,
                        diesel_standard,
                        premium_products,
                        lube_sales,
                        additive_sales,
                    });
                }

                // Move ahead by roughly 1 month
                currentDate.setMonth(currentDate.getMonth() + 1);
            }
        }

        await Sale.insertMany(sales);
        console.log(`✅ ${sales.length} sales records added for ${outlets.length} outlets!`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding sales:", err.message);
        process.exit(1);
    }
};

seedSales();
