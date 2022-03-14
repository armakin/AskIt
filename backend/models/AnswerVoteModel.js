import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const AnswerVote = sequelize.define("answervote", {
  vote: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default AnswerVote;
