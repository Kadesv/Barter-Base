import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Forum extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Forum.init(
  {
    forumId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    context: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
  },
  {
    modelName: 'forum',
    sequelize: db,
  },
);