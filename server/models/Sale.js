import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: true },
    date: { type: Date, required: true },
    petrol_standard: { type: Number, default: 0 },
    diesel_standard: { type: Number, default: 0 },
    premium_products: { type: Number, default: 0 },
    lube_sales: { type: Number, default: 0 },
    additive_sales: { type: Number, default: 0 },
    recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

saleSchema.index({ outlet: 1, date: 1 }, { unique: false });

export default mongoose.model("Sale", saleSchema);
