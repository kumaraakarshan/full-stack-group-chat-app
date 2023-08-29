const Sequelize = require('sequelize');
const sequelize = require('../util/database')

const ForgorPassword = sequelize.define('ForgotPassword', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
    },
    active: Sequelize.BOOLEAN,
    expiresBy: Sequelize.DATE,
})

module.exports = ForgorPassword;