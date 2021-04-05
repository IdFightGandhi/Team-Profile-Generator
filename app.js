// this is where I make inquirer prompts 

// one question, type, list, name,choice,message(what do you want to do)
// .then is a big switch. switch case is the value of what you gave in the question
// write functions

const mysql = require('mysql');
const inquirer = require ('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
const { connect } = require('http2');
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
    .then((answer)=> {
    switch (answer.action) {
        case 'View all Employees':
        searchEmployee();
        break;

        case 'View all Departments':
        searchDept();
        break;

        case 'Add Employee':
        addEmployee();
        break;

        case 'Update Employee Role':
        updateRole();
        break;

        case 'View All Employee Roles':
        viewRole();
        break;

        case 'Add Role':
        addRole();
        break;

        case 'Add Department':
        addDept();
        break;

        case 'Exit':
        connection.end();
        break;
    };
            
    });


};    

function searchEmployee(){
    connect.query ("SELECT * FROM team_db.employee",
    function (err, res) {
        if (err) throw err
        console.table(res)
        search()
    })
};

function searchDept(){
    connect.query ("SELECT * FROM team_db.department",
    function(err,res){
        if (err) throw err
        console.table(res)
        // console.log("searchDept Function hit")
        search()
    })
};

function addEmployee(){
    inquirer
    .prompt([
        {
            type: "input",
            name:"firstname",
            message:"Input First Name"
        },
        {
            type: "input",
            name: "lastname",
            message: "Input Last Name"
        },
        {
            type: "list",
            name: "role",
            message: "Select Employee Role",
            choices: selectRole()
        },
        {
            type:"input",
            name: "firstname",
            message: "Input first name",
            choices: selectManager()
        }

    ])
    .then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connect.query("INSERT INTO employee SET ?",
        {
            first_name: val.firstname,
            last_name: val.lastname,
            manager_id: managerId,
            role_Id: roleId
        },
        function(err) {
            if (err) throw err
            console.table(val)
            search()
        })

    })
};

var roleChoice = [];
function selectRole() {
    connection.query("SELECT * FROM team_db.role",function (err,res) {
        if (err) throw err
        for(var i = 0; i < res.length; i++){
            roleChoice.push(res[i].title);
        }
    })
    return roleChoice;
};

var managerChoice =[];
function selectManager() {
    connection.query("SELECT * FROM team_db.employee WHERE manager_id", function (err, res){
        if (err) throw err
        for (var i = 0; i < res.length; i++) {
            managerChoice.push(res[i].first_name);
        }
    })
    return managerChoice;
};













