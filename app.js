// this is where I make inquirer prompts 

// one question, type, list, name,choice,message(what do you want to do)
// .then is a big switch. switch case is the value of what you gave in the question
// write functions

const mysql = require('mysql');
const inquirer = require ('inquirer');
require('dotenv').config();



let roles;
let employees;
let departments;
let managers;


var connection = mysql.createConnection({
    host: "localhost",

    port:3306,

    user: "root",

    password: process.env.DB_PASSWORD,

    database: "team_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connection hit")
    search();
});

const search = () => {
    inquirer
    .prompt({
        name: 'action',
        type: 'list',
        message: "Choose an action",
        choices:[
            'View all Employees',
            'View all Departments',
            'Add Employee',
            'Update Employee Role',
            'View All Employee Roles',
            'Add Role',
            'Add Department',
            'Exit'

        ],

    })
    .then((answer)=>
    switch (answer.action) {
        case 'View all Employees':
        searchEmployee();
        break;

        case 'View all Departments':
            
    })
}
