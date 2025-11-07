import Outlet from "../models/Outlet.js";
import Zone from "../models/Zone.js";

// Zone CRUD Operations
export const createZone = async (req, res) => {
    try {
        const zone = await Zone.create(req.body);
        res.status(201).json(zone);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Outlet CRUD Operations
export const createOutlet = async (req, res) => {
    try {
        const out = await Outlet.create(req.body);
        res.status(201).json(out);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listOutlets = async (req, res) => {
    try {
        const q = {};
        if (req.query.zone) q.zone = req.query.zone;
        const outs = await Outlet.find(q).populate("zone");
        res.json(outs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getOutletById = async (req, res) => {
    try {
        const outlet = await Outlet.findById(req.params.id).populate("zone");
        if (!outlet) return res.status(404).json({ error: "Outlet not found" });
        res.json(outlet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate("zone");

        if (!outlet) return res.status(404).json({ error: "Outlet not found" });
        res.json(outlet);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const deleteOutlet = async (req, res) => {
    try {
        const outlet = await Outlet.findByIdAndDelete(req.params.id);
        if (!outlet) return res.status(404).json({ error: "Outlet not found" });
        res.json({ message: "Outlet deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};