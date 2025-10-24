import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) return res.status(401).json({ message: "Not authorized" });

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user || !user.isActive) return res.status(401).json({ message: "Invalid token or user inactive" });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalid or expired" });
    }
};

export const authorizeRoles = (...roles) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ message: "Not authenticated" });
    if (!roles.includes(req.user.role)) return res.status(403).json({ message: "Access denied" });
    next();
};
