import { Sequelize, DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
}

export class Movie extends Model {
  public id!: number;
  public name!: string;
  public image!: string;
  public publishDate!: Date;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "User" }
);

Movie.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { sequelize, modelName: "Movie" }
);

sequelize.sync();

export { sequelize };
