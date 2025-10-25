import Sale from "../models/Sale.js";
import Outlet from "../models/Outlet.js";
import Zone from "../models/Zone.js";
import mongoose from "mongoose";

const parseDates = (start, end) => {
    const s = start ? new Date(start) : new Date(new Date().getFullYear(), 0, 1);
    const e = end ? new Date(end) : new Date();
    return { s, e };
};

export const getOutletReport = async (req, res) => {
    const { outletId } = req.params;
    const { start, end } = req.query;
    const { s, e } = parseDates(start, end);

    try {
        const agg = await Sale.aggregate([
            { $match: { outlet: new mongoose.Types.ObjectId(outletId), date: { $gte: s, $lte: e } } },
            {
                $group: {
                    _id: null,
                    petrol_standard: { $sum: "$petrol_standard" },
                    diesel_standard: { $sum: "$diesel_standard" },
                    premium_products: { $sum: "$premium_products" },
                    lube_sales: { $sum: "$lube_sales" },
                    additive_sales: { $sum: "$additive_sales" }
                }
            }
        ]);

        const totals = agg[0] || {
            petrol_standard: 0, diesel_standard: 0, premium_products: 0, lube_sales: 0, additive_sales: 0
        };

        // chart-ready: Pie for product mix
        const pie = [
            { label: "Petrol (Std)", value: totals.petrol_standard },
            { label: "Diesel (Std)", value: totals.diesel_standard },
            { label: "Premium", value: totals.premium_products },
            { label: "Lube", value: totals.lube_sales },
            { label: "Additive", value: totals.additive_sales },
        ];

        // time series monthly bar
        const monthly = await Sale.aggregate([
            { $match: { outlet: new mongoose.Types.ObjectId(outletId), date: { $gte: s, $lte: e } } },
            {
                $project: {
                    year: { $year: "$date" }, month: { $month: "$date" },
                    petrol_standard: 1, diesel_standard: 1, premium_products: 1, lube_sales: 1, additive_sales: 1
                }
            },
            {
                $group: {
                    _id: { year: "$year", month: "$month" },
                    petrol: { $sum: "$petrol_standard" },
                    diesel: { $sum: "$diesel_standard" },
                    premium: { $sum: "$premium_products" },
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({
            summary: totals,
            charts: {
                productMix: pie,
                monthlyTrend: monthly.map(m => ({
                    month: `${m._id.month}/${m._id.year}`,
                    petrol: m.petrol,
                    diesel: m.diesel,
                    premium: m.premium
                }))
            }
        });
    } catch (err) {
        console.error("Error in getOutletReport:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


export const getZoneReport = async (req, res) => {
    const { zoneId } = req.params;
    const { start, end } = req.query;
    const { s, e } = parseDates(start, end);

    try {
        const outlets = await Outlet.find({ zone: zoneId }).select("_id name");
        if (!outlets.length) return res.status(404).json({ message: "No outlets found for this zone" });

        const outletIds = outlets.map(o => new mongoose.Types.ObjectId(o._id));

        const agg = await Sale.aggregate([
            { $match: { outlet: { $in: outletIds }, date: { $gte: s, $lte: e } } },
            {
                $group: {
                    _id: null,
                    petrol_standard: { $sum: "$petrol_standard" },
                    diesel_standard: { $sum: "$diesel_standard" },
                    premium_products: { $sum: "$premium_products" },
                    lube_sales: { $sum: "$lube_sales" },
                    additive_sales: { $sum: "$additive_sales" }
                }
            }
        ]);

        const totals = agg[0] || {
            petrol_standard: 0, diesel_standard: 0, premium_products: 0, lube_sales: 0, additive_sales: 0
        };

        const pie = [
            { label: "Petrol (Std)", value: totals.petrol_standard },
            { label: "Diesel (Std)", value: totals.diesel_standard },
            { label: "Premium", value: totals.premium_products },
            { label: "Lube", value: totals.lube_sales },
            { label: "Additive", value: totals.additive_sales },
        ];

        res.json({
            zoneId,
            totalOutlets: outlets.length,
            totals,
            pie
        });
    } catch (err) {
        console.error("Error in getZoneReport:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


export const getOverallReport = async (req, res) => {
    const { start, end } = req.query;
    const { s, e } = parseDates(start, end);

    try {
        const agg = await Sale.aggregate([
            { $match: { date: { $gte: s, $lte: e } } },
            {
                $group: {
                    _id: null,
                    petrol_standard: { $sum: "$petrol_standard" },
                    diesel_standard: { $sum: "$diesel_standard" },
                    premium_products: { $sum: "$premium_products" },
                    lube_sales: { $sum: "$lube_sales" },
                    additive_sales: { $sum: "$additive_sales" }
                }
            }
        ]);

        const totals = agg[0] || {
            petrol_standard: 0, diesel_standard: 0, premium_products: 0, lube_sales: 0, additive_sales: 0
        };

        const zonesCount = await Zone.countDocuments();
        const outletsCount = await Outlet.countDocuments();

        res.json({
            totals,
            meta: { totalZones: zonesCount, totalOutlets: outletsCount },
            asOf: new Date()
        });
    } catch (err) {
        console.error("Error in getOverallReport:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


export const baselineCompare = async (req, res) => {
    const { outletId } = req.params;
    const { start, end } = req.query;
    const { s, e } = parseDates(start, end);

    try {
        // 1. Outlet totals
        const outletAgg = await Sale.aggregate([
            { $match: { outlet: new mongoose.Types.ObjectId(outletId), date: { $gte: s, $lte: e } } },
            {
                $group: {
                    _id: null,
                    petrol_standard: { $sum: "$petrol_standard" },
                    diesel_standard: { $sum: "$diesel_standard" },
                    premium_products: { $sum: "$premium_products" }
                }
            }
        ]);

        const outlet = outletAgg[0] || { petrol_standard: 0, diesel_standard: 0, premium_products: 0 };

        // 2. Global average baseline
        const allAgg = await Sale.aggregate([
            { $match: { date: { $gte: s, $lte: e } } },
            {
                $group: {
                    _id: "$outlet",
                    petrol_standard: { $sum: "$petrol_standard" },
                    diesel_standard: { $sum: "$diesel_standard" },
                    premium_products: { $sum: "$premium_products" }
                }
            }
        ]);

        const avg = {
            petrol_standard: allAgg.length ? allAgg.reduce((a, b) => a + b.petrol_standard, 0) / allAgg.length : 0,
            diesel_standard: allAgg.length ? allAgg.reduce((a, b) => a + b.diesel_standard, 0) / allAgg.length : 0,
            premium_products: allAgg.length ? allAgg.reduce((a, b) => a + b.premium_products, 0) / allAgg.length : 0,
        };

        const compare = (val, avgVal) => {
            const diff = val - avgVal;
            const percent = avgVal ? ((diff / avgVal) * 100).toFixed(2) : 0;
            return { diff, percent, status: diff >= 0 ? "Above baseline" : "Below baseline" };
        };

        res.json({
            outletId,
            comparison: {
                petrol: compare(outlet.petrol_standard, avg.petrol_standard),
                diesel: compare(outlet.diesel_standard, avg.diesel_standard),
                premium: compare(outlet.premium_products, avg.premium_products)
            }
        });
    } catch (err) {
        console.error("Error in baselineCompare:", err.message);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};