const { DataTypes } = require('sequelize');
const db = require('../db/database');

const User = db.define('tb_Users', {
    user_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_Name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_CPF: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    user_Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
});

// User.sync({ force: true });

module.exports = User;