import express from "express";
import {
    createZone,
    createOutlet,
    listOutlets,
} from "../controllers/outletController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/zone", protect, authorizeRoles("admin"), createZone);
router.post("/", protect, authorizeRoles("admin", "data_report"), createOutlet);
router.get("/", protect, authorizeRoles("data_outlet", "report", "data_report", "admin"), listOutlets);

export default router;
