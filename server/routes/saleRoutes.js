import express from "express";
import { createSale } from "../controllers/saleController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/", protect, authorizeRoles("data_outlet", "data_report", "admin"), createSale);

// CSV ingest: admin or data_report can ingest for any outlet; data_outlet may be restricted to their outlet
// router.post("/csv", protect, authorizeRoles("data_report", "admin"), upload.single("file"), ingestCSV);

export default router;
