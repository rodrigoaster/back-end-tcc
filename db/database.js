const { Sequelize } = require('sequelize');
require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE, 'root', process.env.PASS, {
    host: process.env.HOST,
    dialect: 'mysql'
})

try {
    sequelize.authenticate();
    console.log('deu certo pai, to on');
} catch(err) {
    console.log('deu errado pai, to off', err);
}

module.exports = sequelize;