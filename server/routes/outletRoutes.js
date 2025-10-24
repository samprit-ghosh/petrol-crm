import express from "express";
import {
    createZone,
    createOutlet,
    listOutlets,
} from "../controllers/outletController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🧭 Zone management (Admin only)
router.post("/zone", protect, authorizeRoles("admin"), createZone);

// ⛽ Outlet management
// Create outlet — admin or data_report can create outlets
router.post("/", protect, authorizeRoles("admin", "data_report"), createOutlet);

// List outlets — all roles can view (for dropdowns or reporting filters)
router.get("/", protect, authorizeRoles("data_outlet", "report", "data_report", "admin"), listOutlets);

export default router;
