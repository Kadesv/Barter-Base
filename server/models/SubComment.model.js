import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class SubComment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

SubComment.init(
  {
    subCommentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subCommentText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'subComment',
    sequelize: db,
  },
);