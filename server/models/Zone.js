import mongoose from "mongoose";

const zoneSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
}, { timestamps: true });

export default mongoose.model("Zone", zoneSchema);
