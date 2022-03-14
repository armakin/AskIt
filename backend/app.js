import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import User from "./models/UserModel.js";
import Question from "./models/QuestionModel.js";
import Answer from "./models/AnswerModel.js";
import AnswerVote from "./models/AnswerVoteModel.js";
import QuestionVote from "./models/QuestionVoteModel.js";
import userRoutes from "./routes/userRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, function () {
  console.log(`Server is up and running on port ${PORT}.`);
});

app.get("/", function (req, res) {
  res.send("Server is running.");
});

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.use(function (req, res, next) {
  res.status(404);
  res.json({ error: "Route not found" });
  next();
});

User.hasMany(Question, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Question.belongsTo(User);

User.hasMany(Answer, { foreignKey: { allowNull: false }, onDelete: "CASCADE" });
Answer.belongsTo(User);

User.hasMany(AnswerVote, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
AnswerVote.belongsTo(User);

Answer.hasMany(AnswerVote, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
AnswerVote.belongsTo(Answer);

User.hasMany(QuestionVote, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
QuestionVote.belongsTo(User);

Question.hasMany(QuestionVote, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
QuestionVote.belongsTo(Question);

Question.hasMany(Answer, {
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});

sequelize
  .sync()
  .then(() => console.log("Database synced."))
  .catch((err) => console.log(err));
