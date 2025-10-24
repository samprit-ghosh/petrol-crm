import Outlet from "../models/Outlet.js";
import Zone from "../models/Zone.js";

export const createZone = async (req, res) => {
    const zone = await Zone.create(req.body);
    res.status(201).json(zone);
};

export const createOutlet = async (req, res) => {
    const out = await Outlet.create(req.body);
    res.status(201).json(out);
};

export const listOutlets = async (req, res) => {
    const q = {};
    if (req.query.zone) q.zone = req.query.zone;
    const outs = await Outlet.find(q).populate("zone");
    res.json(outs);
};
