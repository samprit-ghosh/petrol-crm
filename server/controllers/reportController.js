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

    const agg = await Sale.aggregate([
        { $match: { outlet: mongoose.Types.ObjectId(outletId), date: { $gte: s, $lte: e } } },
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
        { $match: { outlet: mongoose.Types.ObjectId(outletId), date: { $gte: s, $lte: e } } },
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

    res.json({ totals, pie, monthly });
};
