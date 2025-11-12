import mongoose from "mongoose";

const csaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: true },
  region: { type: mongoose.Schema.Types.ObjectId, ref: "Zone" },
  district: String,
}, { timestamps: true });

export default mongoose.model("CSA", csaSchema);
