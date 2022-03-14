import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createAnswer,
  updateAnswerById,
  getAnswerById,
  upvoteAnswerById,
  downvoteAnswerById,
  getUserAnswers,
  getQuestionAnswers,
  deleteAnswerById,
  getAllAnswers,
} from "../controllers/answerControllers.js";

const router = express.Router();

router.post("/", protect, createAnswer);
router.get("/profile", protect, getUserAnswers);
router.get("/question/:id", getQuestionAnswers);
router.post("/:id/upvote", protect, upvoteAnswerById);
router.post("/:id/downvote", protect, downvoteAnswerById);
router.put("/:id", protect, updateAnswerById);
router.delete("/:id", protect, deleteAnswerById);
router.get("/", getAllAnswers);
router.get("/:id", getAnswerById);

export default router;
