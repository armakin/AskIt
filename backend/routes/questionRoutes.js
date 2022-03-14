import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createQuestion,
  updateQuestionById,
  getQuestionById,
  upvoteQuestionById,
  downvoteQuestionById,
  getUserQuestions,
  deleteQuestionById,
  getAllQuestions,
} from "../controllers/questionControllers.js";

const router = express.Router();

router.post("/", protect, createQuestion);
router.get("/profile", protect, getUserQuestions);
router.post("/:id/upvote", protect, upvoteQuestionById);
router.post("/:id/downvote", protect, downvoteQuestionById);
router.put("/:id", protect, updateQuestionById);
router.delete("/:id", protect, deleteQuestionById);
router.get("/", getAllQuestions);
router.get("/:id", getQuestionById);

export default router;
