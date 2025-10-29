import Outlet from "../models/Outlet.js";
import Zone from "../models/Zone.js";

export const createZone = async (req, res) => {
    try {
        const zone = await Zone.create(req.body);
        res.status(201).json(zone);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

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