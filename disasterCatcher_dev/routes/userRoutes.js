import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  authenticateUser,
  changePassword,
} from "../controllers/userController.js";
import { protectRoute, verifyUserType } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/login", authenticateUser);

router.use(protectRoute);

router.get("/", verifyUserType(["admin"]), getAllUsers);
router.get("/:id", verifyUserType(["admin", "registered", "verified"]), getUserById);
router.put("/:id", verifyUserType(["registered", "verified", "admin"]), updateUser);
router.delete("/:id", verifyUserType(["admin"]), deleteUser);
router.post("/:id/change-password", verifyUserType(["registered", "verified"]), changePassword);

export default router;
