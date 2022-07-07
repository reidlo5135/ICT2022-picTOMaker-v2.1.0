'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const dbConfig = require('../config/DBConfig');
const db = {};

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.BaseAccessToken = require('./BaseAccessToken')(sequelize, Sequelize);
db.BaseAuthUser = require('./BaseAuthUser')(sequelize, Sequelize);

module.exports = db;
