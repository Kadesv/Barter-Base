import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class SubCategory extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

SubCategory.init(
  {
    subCategoryId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    subCategoryTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'subcategory',
    sequelize: db,
  },
);