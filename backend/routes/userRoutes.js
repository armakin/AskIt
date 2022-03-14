import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
  getAllUsers,
} from "../controllers/userControllers.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/profile", protect, updateUserProfile);
router.get("/profile", protect, getUserProfile);
router.delete("/profile", protect, deleteUserProfile);
router.get("/", getAllUsers);

export default router;
