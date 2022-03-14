import Answer from "../models/AnswerModel.js";
import AnswerVote from "../models/AnswerVoteModel.js";

// @desc    Create a new answer
// @route   POST /answers
// @access  Private
const createAnswer = async (req, res) => {
  try {
    const { body, questionId } = req.body;

    let answer = await req.user.createAnswer({
      body: body,
      questionId: questionId,
    });

    if (answer) {
      res.send({
        id: answer.id,
        body: answer.body,
        userId: answer.userId,
        questionId: answer.questionId,
        upvotes: answer.upvotes,
        downvotes: answer.downvotes,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create an answer.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Update answer by id
// @route   PUT /answers/:id
// @access  Private
const updateAnswerById = async (req, res) => {
  try {
    const user = req.user;
    const answerId = req.params.id;
    const { body } = req.body;

    let answer = await Answer.findByPk(answerId);

    if (user && answer && user.id === answer.userId) {
      answer.body = body || answer.body;

      const updatedAnswer = await answer.save();

      res.send({
        id: updatedAnswer.id,
        body: updatedAnswer.body,
        userId: updatedAnswer.userId,
        upvotes: updatedAnswer.upvotes,
        downvotes: updatedAnswer.downvotes,
      });
    } else {
      res.status(404);
      throw new Error("Answer not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get answer by id
// @route   GET /answers/:id
// @access  Public
const getAnswerById = async (req, res) => {
  try {
    const answerId = req.params.id;

    let answer = await Answer.findByPk(answerId);

    if (answer) {
      res.send({
        id: answer.id,
        body: answer.body,
        userId: answer.userId,
        upvotes: answer.upvotes,
        downvotes: answer.downvotes,
      });
    } else {
      res.status(404);
      throw new Error("Answer not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Handle click on upvote. If user already upvotes the answer, removes the upvote.
//          Else, upvotes the answer by the user.
// @route   POST /answers/:id/upvote
// @access  Private
const upvoteAnswerById = async (req, res) => {
  try {
    const answerId = req.params.id;

    let answer = await Answer.findByPk(answerId);

    if (!answer) {
      res.status(404);
      throw new Error("Answer not found.");
    }

    let answerVote = await AnswerVote.findOne({
      where: { userId: req.user.id, answerId: answerId },
    });

    // if vote not found, insert vote in AnswerVotes,
    // and increase upvotes count for that answer
    if (!answerVote) {
      await AnswerVote.create({
        vote: 1,
        userId: req.user.id,
        answerId: answerId,
      });

      answer.upvotes = answer.upvotes + 1;
      await answer.save();

      res.send({ message: "Answer successfully upvoted." });
    } else {
      if (answerVote.vote == 1) {
        // if already upvoted, delete the upvote
        await answerVote.destroy();
        answer.upvotes = answer.upvotes - 1;
        await answer.save();
        res.send({ message: "Answer upvote successfully removed." });
      } else if (answerVote.vote == -1) {
        // if already downvoted, change downvote to upvote
        answerVote.vote = 1;
        await answerVote.save();
        answer.upvotes = answer.upvotes + 1;
        answer.downvotes = answer.downvotes - 1;
        await answer.save();
        res.send({ message: "Answer successfully upvoted." });
      }
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Handle click on downvote. If user already downvotes the answer, removes the downvote.
//          Else, downvotes the answer by the user.
// @route   POST /answers/:id/downvote
// @access  Private
const downvoteAnswerById = async (req, res) => {
  try {
    const answerId = req.params.id;

    let answer = await Answer.findByPk(answerId);

    if (!answer) {
      res.status(404);
      throw new Error("Answer not found.");
    }

    let answerVote = await AnswerVote.findOne({
      where: { userId: req.user.id, answerId: answerId },
    });

    // if vote not found, insert vote in AnswerVotes,
    // and increase upvotes count for that answer
    if (!answerVote) {
      await AnswerVote.create({
        vote: -1,
        userId: req.user.id,
        answerId: answerId,
      });

      answer.downvotes = answer.downvotes + 1;
      await answer.save();

      res.send({ message: "Answer successfully downvoted." });
    } else {
      // if already downvoted, delete the downvote
      if (answerVote.vote == -1) {
        await answerVote.destroy();
        answer.downvotes = answer.downvotes - 1;
        await answer.save();
        res.send({ message: "Answer downvote successfully removed." });
      } else if (answerVote.vote == 1) {
        // if already upvoted, change upvote to downvote
        answerVote.vote = -1;
        await answerVote.save();
        answer.downvotes = answer.downvotes + 1;
        answer.upvotes = answer.upvotes - 1;
        await answer.save();
        res.send({ message: "Answer successfully downvoted." });
      }
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get all answers of logged in user
// @route   GET /answers/profile
// @access  Private
const getUserAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "ASC"]],
    });
    res.send(answers);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
};

// @desc    Get all answers for selected question
// @route   GET /answers/question/:id
// @access  Public
const getQuestionAnswers = async (req, res) => {
  try {
    const questionId = req.params.id;
    const answers = await Answer.findAll({
      where: { questionId: questionId },
      order: [["createdAt", "ASC"]],
    });
    res.send(answers);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
};

// @desc    Delete answer by id
// @route   DELETE /answers/:id
// @access  Private
const deleteAnswerById = async (req, res) => {
  try {
    const user = req.user;
    const answerId = req.params.id;
    const { body } = req.body;

    let answer = await Answer.findByPk(answerId);

    if (user && answer && user.id === answer.userId) {
      await answer.destroy();
      res.send({ message: "Answer successfully deleted." });
    } else {
      res.status(404);
      throw new Error("Answer not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get list of all answers
// @route   GET /answers
// @access  Public
async function getAllAnswers(req, res) {
  try {
    const answers = await Answer.findAll({ order: [["createdAt", "ASC"]] });
    res.send(answers);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
}

export {
  createAnswer,
  updateAnswerById,
  getAnswerById,
  upvoteAnswerById,
  downvoteAnswerById,
  getUserAnswers,
  getQuestionAnswers,
  deleteAnswerById,
  getAllAnswers,
};
