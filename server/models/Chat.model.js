import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";
export default class Chat extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}
Chat.init(
  {
    chatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user1Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user2Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user1DelDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    user2DelDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    modelName: 'chat',
    tableName: 'chats',
    sequelize: db,
  },
);