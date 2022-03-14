import Question from "../models/QuestionModel.js";
import QuestionVote from "../models/QuestionVoteModel.js";
import Answer from "../models/AnswerModel.js";

// @desc    Create a new question
// @route   POST /questions
// @access  Private
const createQuestion = async (req, res) => {
  try {
    const { body } = req.body;

    let question = await req.user.createQuestion({
      body: body,
    });

    if (question) {
      res.send({
        id: question.id,
        body: question.body,
        userId: question.userId,
        upvotes: question.upvotes,
        downvotes: question.downvotes,
      });
    } else {
      res.status(400);
      throw new Error("Failed to create a question.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Update question by id
// @route   PUT /questions/:id
// @access  Private
const updateQuestionById = async (req, res) => {
  try {
    const user = req.user;
    const questionId = req.params.id;
    const { body } = req.body;

    let question = await Question.findByPk(questionId);

    if (user && question && user.id === question.userId) {
      question.body = body || question.body;

      const updatedQuestion = await question.save();

      res.send({
        id: updatedQuestion.id,
        body: updatedQuestion.body,
        userId: updatedQuestion.userId,
        upvotes: updatedQuestion.upvotes,
        downvotes: updatedQuestion.downvotes,
      });
    } else {
      res.status(404);
      throw new Error("Question update failed.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get question by id
// @route   GET /questions/:id
// @access  Public
const getQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);
    let answersCount = await Answer.count({
      where: {
        questionId: questionId,
      },
    });

    if (question) {
      res.send({
        id: question.id,
        body: question.body,
        userId: question.userId,
        upvotes: question.upvotes,
        downvotes: question.downvotes,
        answersCount: answersCount,
      });
    } else {
      res.status(404);
      throw new Error("Question not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Handle click on upvote. If user already upvotes the question, removes the upvote.
//          Else, upvotes the question by the user.
// @route   POST /questions/:id/upvote
// @access  Private
const upvoteQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);

    if (!question) {
      res.status(404);
      throw new Error("Question not found.");
    }

    let questionVote = await QuestionVote.findOne({
      where: { userId: req.user.id, questionId: questionId },
    });

    // if vote not found, insert vote in QuestionVotes,
    // and increase upvotes count for that question
    if (!questionVote) {
      await QuestionVote.create({
        vote: 1,
        userId: req.user.id,
        questionId: questionId,
      });

      question.upvotes = question.upvotes + 1;
      await question.save();

      res.send({ message: "Question successfully upvoted." });
    } else {
      if (questionVote.vote == 1) {
        // if already upvoted, delete the upvote
        await questionVote.destroy();
        question.upvotes = question.upvotes - 1;
        await question.save();
        res.send({ message: "Question upvote successfully removed." });
      } else if (questionVote.vote == -1) {
        // if already downvoted, change downvote to upvote
        questionVote.vote = 1;
        await questionVote.save();
        question.upvotes = question.upvotes + 1;
        question.downvotes = question.downvotes - 1;
        await question.save();
        res.send({ message: "Question successfully upvoted." });
      }
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Handle click on downvote. If user already downvotes the question, removes the downvote.
//          Else, downvotes the question by the user.
// @route   POST /questions/:id/downvote
// @access  Private
const downvoteQuestionById = async (req, res) => {
  try {
    const questionId = req.params.id;

    let question = await Question.findByPk(questionId);

    if (!question) {
      res.status(404);
      throw new Error("Question not found.");
    }

    let questionVote = await QuestionVote.findOne({
      where: { userId: req.user.id, questionId: questionId },
    });

    // if vote not found, insert vote in QuestionVotes,
    // and increase upvotes count for that question
    if (!questionVote) {
      await QuestionVote.create({
        vote: -1,
        userId: req.user.id,
        questionId: questionId,
      });

      question.downvotes = question.downvotes + 1;
      await question.save();

      res.send({ message: "Question successfully downvoted." });
    } else {
      // if already downvoted, delete the downvote
      if (questionVote.vote == -1) {
        await questionVote.destroy();
        question.downvotes = question.downvotes - 1;
        await question.save();
        res.send({ message: "Question downvote successfully removed." });
      } else if (questionVote.vote == 1) {
        // if already upvoted, change upvote to downvote
        questionVote.vote = -1;
        await questionVote.save();
        question.downvotes = question.downvotes + 1;
        question.upvotes = question.upvotes - 1;
        await question.save();
        res.send({ message: "Question successfully downvoted." });
      }
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get all questions of logged in user
// @route   GET /questions/profile
// @access  Private
const getUserQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.send(questions);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
};

// @desc    Delete question by id
// @route   DELETE /questions/:id
// @access  Private
const deleteQuestionById = async (req, res) => {
  try {
    const user = req.user;
    const questionId = req.params.id;
    const { body } = req.body;

    let question = await Question.findByPk(questionId);

    if (user && question && user.id === question.userId) {
      await question.destroy();
      res.send({ message: "Question successfully deleted." });
    } else {
      res.status(404);
      throw new Error("Question not found.");
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

// @desc    Get list of all questions
// @route   GET /questions
// @access  Public
async function getAllQuestions(req, res) {
  try {
    const questions = await Question.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.send(questions);
  } catch (e) {
    res.status(404);
    res.send({ error: e.message });
  }
}

export {
  createQuestion,
  updateQuestionById,
  getQuestionById,
  upvoteQuestionById,
  downvoteQuestionById,
  getUserQuestions,
  deleteQuestionById,
  getAllQuestions,
};
