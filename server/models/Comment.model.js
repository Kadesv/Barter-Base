import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Comment extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Comment.init(
  {
    commentId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    commentText: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'comment',
    sequelize: db,
  },
);
