const { DataTypes } = require('sequelize');
const db = require('../db/database');

const User = require('../models/User');

const Calc = db.define('tb_Calcs', {
    calc_Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    calc_Eletro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calc_Potencia: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calc_QuantEletro: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calc_QuantHours: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calc_QuantDays: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calc_Consumo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    calc_Gasto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

});

Calc.belongsTo(User);

// Calc.sync({ force: true });

module.exports = Calc;