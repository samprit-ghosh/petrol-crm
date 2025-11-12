import mongoose from "mongoose";

const MetricSchema = new mongoose.Schema({
    normalPetrol: { type: Number, default: 0 },
    normalDiesel: { type: Number, default: 0 },
    premiumPetrol: { type: Number, default: 0 },
    hpPay: { type: Number, default: 0 },
    googleReviews: { type: Number, default: 0 },
    newCustomers: { type: Number, default: 0 },
    complaintsResolved: { type: Number, default: 0 },
    lubeSales: { type: Number, default: 0 },
    additiveSales: { type: Number, default: 0 },
}, { _id: false });

const performanceRecordSchema = new mongoose.Schema({
    csa: { type: mongoose.Schema.Types.ObjectId, ref: "CSA", required: true },
    outlet: { type: mongoose.Schema.Types.ObjectId, ref: "Outlet", required: true },
    uploadType: {
        type: String,
        enum: ["preTraining", "postTraining", "weekly", "monthly"],
        required: true
    },
    uploadDate: { type: Date, default: Date.now },
    metrics: { type: MetricSchema, default: () => ({}) },
    comparison: {
        preTrainingId: { type: mongoose.Schema.Types.ObjectId, ref: "PerformanceRecord" },
        improvementPercentages: { type: Object, default: {} },
        overallScore: { type: Number, default: 0 }
    }
}, { timestamps: true });

export default mongoose.model("PerformanceRecord", performanceRecordSchema);
