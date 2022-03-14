import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const Answer = sequelize.define("answer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  body: {
    type: Sequelize.STRING(4096),
    allowNull: false,
  },
  upvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  downvotes: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

export default Answer;
