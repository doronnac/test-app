const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Note = sequelize.define('note', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    note: {type: DataTypes.JSON},
    type: {type: DataTypes.STRING}
})

const Template = sequelize.define('template', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    note: {type: DataTypes.JSON},
    type: {type: DataTypes.STRING}
})

module.exports = {
   Note,
   Template
}





