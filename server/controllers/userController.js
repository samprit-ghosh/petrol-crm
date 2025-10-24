import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: "admin" } }).select("-password");
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUserRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role, outletId } = req.body;
        if (!["data_outlet", "report", "data_report", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }
        const user = await User.findByIdAndUpdate(id, { role, outletId }, { new: true }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const activateDeactivate = async (req, res) => {
    try {
        const { id } = req.params;
        const { isActive } = req.body;
        if (typeof isActive !== "boolean") {
            return res.status(400).json({ message: "isActive must be boolean" });
        }
        const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        return res.status(200).json(user);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const adminCreateUser = async (req, res) => {
    try {
        const { name, email, password, role, outletId } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        if (role && !["data_outlet", "report", "data_report", "admin"].includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User exists" });

        const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
        const hashed = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ name, email, password: hashed, role: role || "data_outlet", outletId: outletId || null });
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
