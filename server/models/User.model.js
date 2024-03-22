import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // preferredName: {
    //   type: DataTypes.STRING(25),
    //   allowNull: true,
    //   unique: false,
    // },
    firstName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: false,
    },
    lastName: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: false,
    },
    // city: {
    //   type: DataTypes.STRING(25),
    //   allowNull: true,
    // },
    // state: {
    //   type: DataTypes.STRING(25),
    //   allowNull: true,
    // },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);

