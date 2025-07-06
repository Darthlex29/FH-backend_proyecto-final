import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Note = sequelize.define("note", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});