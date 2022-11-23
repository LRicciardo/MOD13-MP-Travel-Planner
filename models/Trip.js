const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_budget: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    traveller_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    traveller_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'traveller',
        key: 'id',
      },
    },
    location_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      uniqueFlag: false,
      references: {
        model: 'location',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'trip'
  }
);

module.exports = Trip;
