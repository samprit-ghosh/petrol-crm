import Sale from "../models/Sale.js";
import Outlet from "../models/Outlet.js";
// import { parseCSVToObjects } from "../../utils/csvParser.js";
import fs from "fs";

export const createSale = async (req, res) => {
    const payload = req.body;
    // Validate outlet exists
    const outletExists = await Outlet.findById(payload.outlet);
    if (!outletExists) return res.status(400).json({ message: "Outlet not found" });
    const sale = await Sale.create({ ...payload, recordedBy: req.user._id });
    res.status(201).json(sale);
};

// export const ingestCSV = async (req, res) => {
//     if (!req.file) return res.status(400).json({ message: "CSV file required" });
//     const path = req.file.path;
//     try {
//         const rows = await parseCSVToObjects(path); // returns array of objects
//         // expected CSV columns: outletCode,date,petrol_standard,diesel_standard,premium_products,lube_sales,additive_sales
//         const bulk = [];
//         for (const row of rows) {
//             const outlet = await Outlet.findOne({ code: row.outletCode });
//             if (!outlet) continue; // skip unknown outlets or optionally collect errors
//             bulk.push({
//                 outlet: outlet._id,
//                 date: new Date(row.date),
//                 petrol_standard: Number(row.petrol_standard || 0),
//                 diesel_standard: Number(row.diesel_standard || 0),
//                 premium_products: Number(row.premium_products || 0),
//                 lube_sales: Number(row.lube_sales || 0),
//                 additive_sales: Number(row.additive_sales || 0),
//                 recordedBy: req.user._id,
//             });
//         }
//         if (bulk.length) {
//             await Sale.insertMany(bulk);
//         }
//         fs.unlinkSync(path);
//         res.json({ inserted: bulk.length });
//     } catch (err) {
//         fs.unlinkSync(path);
//         res.status(500).json({ message: err.message });
//     }
// };
