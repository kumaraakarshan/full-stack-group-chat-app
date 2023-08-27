const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../utils/database");
const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: false,
  }
 
});
module.exports = User;
