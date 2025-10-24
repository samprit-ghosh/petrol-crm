import express from "express";
import { getAllUsers, updateUserRole, activateDeactivate, adminCreateUser } from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(protect, authorizeRoles("admin"));

router.get("/", getAllUsers);
router.post("/create", adminCreateUser);
router.patch("/:id/role", updateUserRole);
router.patch("/:id/active", activateDeactivate);

export default router;