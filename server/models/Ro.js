import mongoose from "mongoose";

const roSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    region: { type: mongoose.Schema.Types.ObjectId, ref: "Region", required: true },

    // Optional metadata about the outlet
    code: { type: String },
    address: { type: String },
    contactNumber: { type: String },
    managerName: { type: String },

    // Aggregated sales metrics (for quick dashboard view)
    totalSalesPetrol: { type: Number, default: 0 },
    totalSalesDiesel: { type: Number, default: 0 },
    totalSalesPower95: { type: Number, default: 0 },

    totalTransactions: { type: Number, default: 0 },
    totalGoogleReviews: { type: Number, default: 0 },
    totalCustomersOnboarded: { type: Number, default: 0 },
    totalComplaintsResolved: { type: Number, default: 0 },
    totalLubeSales: { type: Number, default: 0 },
    totalAdditiveSales: { type: Number, default: 0 },

    meta: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

export default mongoose.model("RO", roSchema);
