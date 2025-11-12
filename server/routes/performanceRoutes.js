import express from "express";
import {
    uploadPerformance,
    getPerformanceRecords,
    comparePerformance,
    getPerformanceById,
    deletePerformance,
} from "../controllers/performanceController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/performance → upload data
router.post("/", protect, authorizeRoles("admin", "trainer"), uploadPerformance);

// GET /api/performance/compare?csa=&outlet= → compare pre vs post (MUST come before /:id)
router.get("/compare", protect, authorizeRoles("admin", "trainer", "report"), comparePerformance);

// GET /api/performance → list all
router.get("/", protect, authorizeRoles("admin", "trainer", "report"), getPerformanceRecords);

// GET /api/performance/:id → single record (AFTER specific routes)
router.get("/:id", protect, authorizeRoles("admin", "trainer", "report"), getPerformanceById);

// DELETE /api/performance/:id → delete
router.delete("/:id", protect, authorizeRoles("admin"), deletePerformance);

export default router;