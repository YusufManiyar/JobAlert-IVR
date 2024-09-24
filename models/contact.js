const { DataTypes } = require('sequelize')
const sequelize = require('../db.js')

const contact = sequelize.define('contact', {
 name: { type: DataTypes.STRING, allowNull: false },
 email: { type: DataTypes.STRING, allowNull: false },
 phoneNo: { type: DataTypes.STRING, allowNull: false, unique: true },
 message: { type: DataTypes.STRING, allowNull: false },
 fileUrl: { type: DataTypes.STRING, allowNull: false},
 callAttempt:{ type: DataTypes.INTEGER, allowNull:false, defaultValue: 0},
 callCompleted: { type: DataTypes.BOOLEAN, defaultValue: false}

});


module.exports = contact