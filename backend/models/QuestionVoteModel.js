import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const QuestionVote = sequelize.define("questionvote", {
  vote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default QuestionVote;
