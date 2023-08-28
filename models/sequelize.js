require('dotenv').config();
const Sequelize = require('sequelize');

const {DB_NAME,DB_USER_NAME,DB_PASSWORD,DB_HOST} = process.env;

const sequelize = new Sequelize(DB_NAME,DB_USER_NAME,DB_PASSWORD,{
    host:DB_HOST,
    dialect:'mysql'
});


module.exports = sequelize;