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
    
    subCategoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    modelName: 'subcategory',
    tableName: 'subcategories',
    sequelize: db,
  },
);
