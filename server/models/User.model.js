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
    city: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING(25),
      allowNull: true,
    },
    zipCode:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
  },
    {
    modelName: 'user',
    tableName: 'users',
    sequelize: db,
  },
); 