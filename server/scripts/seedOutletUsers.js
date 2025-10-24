import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Outlet from "../models/Outlet.js";

dotenv.config();
connectDB();

const seedOutletUsers = async () => {
    try {
        const outlets = await Outlet.find();

        if (outlets.length === 0) {
            console.log("⚠️ No outlets found. Please run seedOutlets.js first.");
            process.exit(0);
        }

        const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);

        const users = outlets.map((outlet, index) => ({
            name: `${outlet.name} Operator`,
            email: `operator${index + 1}@gmail.com`,
            password: bcrypt.hashSync("outlet123", saltRounds), // same default password for testing
            role: "data_outlet",
            outletId: outlet._id,
            isActive: true,
        }));

        await User.deleteMany({ role: "data_outlet" }); // optional: clear only outlet users
        const created = await User.insertMany(users);

        console.log(`✅ ${created.length} data_outlet users created successfully!`);
        console.log("📧 Login credentials for testing:");
        created.forEach((u, i) => {
            console.log(`${i + 1}. ${u.email} / outlet123 → ${u.name}`);
        });

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding outlet users:", err.message);
        process.exit(1);
    }
};

seedOutletUsers();
