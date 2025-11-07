import express from "express";
import {
    createZone,
    createOutlet,
    listOutlets,
    getOutletById,
    updateOutlet,
    deleteOutlet,
} from "../controllers/outletController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Zone Routes
router.post("/zone", protect, authorizeRoles("admin"), createZone);

// Outlet Routes
router.post("/", protect, authorizeRoles("admin", "data_report"), createOutlet);
router.get("/", protect, authorizeRoles("data_outlet", "report", "data_report", "admin"), listOutlets);
router.get("/:id", protect, authorizeRoles("data_outlet", "report", "data_report", "admin"), getOutletById);
router.put("/:id", protect, authorizeRoles("admin", "data_report"), updateOutlet);
router.delete("/:id", protect, authorizeRoles("admin"), deleteOutlet);

export default router;
