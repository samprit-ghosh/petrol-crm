import mongoose from "mongoose";

const outletSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, unique: true },
    zone: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
    address: { type: String, required: true },
    footfallType: { type: String, enum: ["urban", "rural", "highway"], default: "urban" },
    meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model("Outlet", outletSchema);
