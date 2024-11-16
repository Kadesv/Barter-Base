import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Image extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Image.init(
  {
    imageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imageType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imageName: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

  },
  {
    modelName: 'image',
    tableName: 'images',
    sequelize: db,
  },
);