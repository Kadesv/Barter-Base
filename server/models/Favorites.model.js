import { DataTypes, Model } from "sequelize";
import util from 'util';
import { db } from "../config/db.js";

export default class Favorites extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
}

Favorites.init(
  {
    favoritesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

  },
  {
    modelName: 'favorites',
    sequelize: db,
  },
);