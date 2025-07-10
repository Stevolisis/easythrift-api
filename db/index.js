const sequelize = require('../config/database');
const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('./models/user.model');

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Load models
db.User = UserModel(sequelize, DataTypes);

module.exports = db;
