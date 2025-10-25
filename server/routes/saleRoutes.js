import express from "express";
import { createSale, ingestCSV } from "../controllers/saleController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.post("/", protect, authorizeRoles("data_outlet", "data_report", "admin"), createSale);

router.post("/csv", protect, authorizeRoles("data_report", "admin"), upload.single("file"), ingestCSV);

export default router;
