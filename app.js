"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
// Accept json data:
app.use(express.json())

require('express-async-errors')

app.all('/', (req, res) => {
    res.send('WELCOME TO TODO API')
})


//*SEQUELİZE
// npm i sequlize sqlite3

const {Sequelize,  DataTypes} = require('sequelize')

// const sequelize = new Sequelize('sqlite:./db.sqlite3')
const sequelize = new Sequelize('sqlite:' + (process.env.SQLITE || './db.sqlite3'))


//Model
//sequelize.define('taboName', {tableDetails})

const Todo = sequelize.define('todos', {

    // id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   unique: true,
    //   comment: 'description',
    //   primaryKey: true,
    //   autoIncrement: true,
    //   field: 'custom_name',
    //   defaultValue: 0
    // },


    title: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // description: {
    //     type: DataTypes.TEXT,
       
    // },
    description: DataTypes.TEXT,

    priority: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0

    },

    isDone: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },


})

// sequelize.sync()
// sequelize.sync({force: true})
sequelize.sync({alter: true})




// continue from here...

const errorHandler = (err, req, res, next) => {
    const errorStatusCode = res.errorStatusCode ?? 500
    console.log('errorHandler worked.')
    res.status(errorStatusCode).send({
        error: true, // special data
        message: err.message, // error string message
        cause: err.cause, // error option cause
        // stack: err.stack, // error details
    })
}
app.use(errorHandler)
/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));