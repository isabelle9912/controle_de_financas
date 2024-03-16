const { DataTypes } = require("sequelize");

const db = require("../db/conn");

const User = require("./User");

const Deal = db.define("Deal", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  value: {
    type: DataTypes.FLOAT,
  },
  day: {
    type: DataTypes.INTEGER,
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
    defaultValue: "pendente",
  },
});

Deal.belongsTo(User);
User.hasMany(Deal);

module.exports = Deal;
