'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    point: DataTypes.INTEGER,
    role: DataTypes.STRING,
    accesstoken: DataTypes.STRING,
    refreshtoken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};