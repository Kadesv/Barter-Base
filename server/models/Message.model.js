import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Message extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Message.init(
  {
    MessageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    MessageText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'message',
    sequelize: db,
  },
);