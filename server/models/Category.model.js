import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Category extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Category.init(
  {
    categoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'category',
    tableName: 'categories',
    sequelize: db,
  },
);