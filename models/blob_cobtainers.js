'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class blob_cobtainers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate() {
      // define association here
    }
  }
  blob_cobtainers.init({
    name: DataTypes.STRING,
    ref: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    tableName: 'blob_cobtainers',
    modelName: 'Blob_cobtainers',
  });
  return blob_cobtainers;
};