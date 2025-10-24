import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, role, outletId } = req.body;
        if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ message: "User exists" });

        const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
        const hashed = await bcrypt.hash(password, saltRounds);

        const user = await User.create({ name, email, password: hashed, role, outletId: outletId || null });
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email & password required" });

        const user = await User.findOne({ email });
        if (!user || !user.isActive) return res.status(400).json({ message: "Invalid credentials" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
