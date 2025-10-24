import express from "express";
import { getOutletReport } from "../controllers/reportController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/outlet/:outletId", protect, authorizeRoles("report", "data_report", "admin"), getOutletReport);
// router.get("/zone/:zoneId", protect, authorizeRoles("report", "data_report", "admin"), getZoneReport);
// router.get("/overall", protect, authorizeRoles("report", "data_report", "admin"), getOverallReport);
// router.get("/baseline-compare", protect, authorizeRoles("report", "data_report", "admin"), baselineCompare);

export default router;
