// this is where I make inquirer prompts 

// one question, type, list, name,choice,message(what do you want to do)
// .then is a big switch. switch case is the value of what you gave in the question
// write functions

const mysql = require('mysql');
const inquirer = require ('inquirer');
const { allowedNodeEnvironmentFlags } = require('process');
const { connect } = require('http2');
const { ER_GENERATED_COLUMN_FUNCTION_IS_NOT_ALLOWED } = require('mysql/lib/protocol/constants/errors');
const { listenerCount } = require('events');
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
    connection.query ("SELECT * FROM team_db.employee",
    function (err, res) {
        if (err) throw err
        console.table(res)
        search()
    })
};

function searchDept(){
    connection.query ("SELECT * FROM team_db.department",
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
            name: "managername",
            message: "Input Manager's Name",
            choices: selectManager()
        }

    ])
    .then(function (val) {
        var roleId = selectRole().indexOf(val.role) + 1
        var managerId = selectManager().indexOf(val.choice) + 1
        connection.query("INSERT INTO employee SET ?",
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

function addDept() {
    inquirer
    .prompt([
    {
        name:"name",
        type:"input",
        message: "Add Department Name"
    }
    ])
    .then(function(res){
        var query = connection.query ("INSERT INTO department SET ?",
        {
            name: res.name
        },
        function (err) {
            if (err) throw err
            console.table(res);
            search();
        })
    });
};

function viewRole() {
    connection.query("SELECT * FROM team_db.role",
    function (err, res){
        if (err,res) {
            if (err) throw err
            console.table(res)
            search();
        }
    })
};

  function updateRole() {

    connection.query ("SELECT id, first_name, last_name FROM employee",
    function (err, res){
        // console.log(res)
        const allEmployees = res.map(({id, first_name, last_name})=>(
        {
            name:`${first_name} ${last_name}`,
            value: id
        }))
        

        const {employeeId} =  inquirer.prompt([
        {
            type: "list",
            name: "employeeId",
            message:"For which Employee would you like to update role?",
            choices: allEmployees
        }
    ])
    .then(answer=>{
        console.log(answer.employeeId)



        
    })


    });









};

   
    
    // const role = connection.query("SELECT * FROM role");
    // const allRoles = role.map(({title, id})=>(
    //     {
    //         name: title,
    //         value: id
    //     }
    // ));
    // const {roleId}= inquirer.prompt([
    //     {
    //         type:"list",
    //         name: "roleId",
    //         message:"Choose new Employee role",
    //         choices: allRoles
    //     }
    // ])
    // connection.query("UPDATE employee SET ? WHERE ?",
    //     [{
    //         role_id: roleId,
    //         employee_id: employeeId
    //     },
    //     ])
    
        


 



    //     inquirer.prompt([
    //         // {
    //         //     name: "employee",
    //         //     type: "list",
    //         //     choices: searchEmployee()
    //         // },
    //         {
    //             name:"role",
    //             type: "list",
    //             message: "Input Employee's new title ",
    //             choices: selectRole()
    //         }
    //     ])
    //     .then(answers=> {
    //         console.log(val)

    //         var roleId = answers.role
    //         var employeeId = answers.employee

  
    //     function (err){
    //         if (err) throw err
    //         console.table(val)
    //         search()
    //     })
    // })