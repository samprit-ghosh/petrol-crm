import PerformanceRecord from "../models/PerformanceRecord.js";
import CSA from "../models/CSA.js";
import Outlet from "../models/Outlet.js";
import mongoose from "mongoose";

// 📌 Create (upload) pre/post/weekly/monthly performance
export const uploadPerformance = async (req, res) => {
    try {
        const { csa, outlet, uploadType, metrics } = req.body;

        if (!csa || !outlet || !uploadType)
            return res.status(400).json({ message: "Missing required fields" });

        const record = await PerformanceRecord.create({
            csa,
            outlet,
            uploadType,
            metrics,
        });

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📊 Get all records (with filters)
export const getPerformanceRecords = async (req, res) => {
    try {
        const { csa, outlet, uploadType } = req.query;

        const query = {};
        if (csa) query.csa = csa;
        if (outlet) query.outlet = outlet;
        if (uploadType) query.uploadType = uploadType;

        const records = await PerformanceRecord.find(query)
            .populate("csa")
            .populate("outlet");

        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 📈 Compare preTraining vs postTraining for a CSA/outlet
export const comparePerformance = async (req, res) => {
    try {
        const { csa, outlet } = req.query;

        if (!csa || !outlet)
            return res.status(400).json({ message: "CSA and Outlet are required" });

        const pre = await PerformanceRecord.findOne({ csa, outlet, uploadType: "preTraining" });
        const post = await PerformanceRecord.findOne({ csa, outlet, uploadType: "postTraining" });

        if (!pre || !post)
            return res.status(404).json({ message: "Pre or Post training data missing" });

        const improvementPercentages = {};
        const metrics = Object.keys(pre.metrics.toObject());

        metrics.forEach((key) => {
            const preVal = pre.metrics[key] || 0;
            const postVal = post.metrics[key] || 0;
            improvementPercentages[key] =
                preVal === 0 ? (postVal > 0 ? 100 : 0) : ((postVal - preVal) / preVal) * 100;
        });

        const overallScore =
            Object.values(improvementPercentages).reduce((a, b) => a + b, 0) /
            metrics.length;

        post.comparison = {
            preTrainingId: pre._id,
            improvementPercentages,
            overallScore,
        };
        await post.save();

        res.json({
            preTraining: pre,
            postTraining: post,
            improvementPercentages,
            overallScore: overallScore.toFixed(2),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🔍 Get single record
export const getPerformanceById = async (req, res) => {
    try {
        const record = await PerformanceRecord.findById(req.params.id)
            .populate("csa")
            .populate("outlet");

        if (!record) return res.status(404).json({ message: "Record not found" });

        res.json(record);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 🗑️ Delete performance record
export const deletePerformance = async (req, res) => {
    try {
        await PerformanceRecord.findByIdAndDelete(req.params.id);
        res.json({ message: "Record deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
