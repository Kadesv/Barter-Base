import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Notification extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Notification.init(
  {
    notificationId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    messageId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

  },
  {
    modelName: 'notification',
    sequelize: db,
  },
);