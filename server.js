// dependencies
const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

//Information found in MySQL Workbench under Server Status
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password:"Mysql101!",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    init(); 
});

//init function to initialize app
//Using inquirer to prompt the user with questions
function init() {
    inquirer.prompt({
        name: 'choice',
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View departments",
            "View roles",
            "View employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Exit"
        ]
    })
    .then(function(response) {
        switch (response.choice) {
            case "View departments":
                departmentView();
                break;

            case "View roles":
                roleView();
                break;

            case "View employees":
                employeesView();
                break;

            case "Add department":
                departmentAdd();
                break;

            case "Add role":
                roleAdd();
                break;
            
            case "Add employee":
                employeeAdd();
                break;

            case "Update employee role":
                employeeUpdate();
                break;

            case "Exit":
                connection.end();
                break;

        }
    }).catch(function(err) {
        console.log(err);
        init();
    });
}

// ref: https://www.tabnine.com/code/javascript/functions/mysql/Connection/query
// ref: https://www.codegrepper.com/code-examples/sql/how+to+see+inside+table+mysql
function departmentView() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function roleView() {
    connection.query("SELECT * FROM roles", function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

function employeesView() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
        init();
    })
}

//ref: https://stackoverflow.com/questions/30457086/what-is-the-difference-between-single-and-double-question-mark-in-n
function departmentAdd() {
    inquirer.prompt({
        name: "departmentName",
        type: "input",
        message: "What is the name of the department?"
    }).then(function(response) {
        connection.query("INSERT INTO department (name) VALUES (?)", [response.departmentName], function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

function roleAdd() {
    inquirer.prompt([
        {
            name: "titleName",
            type: "input",
            message: "What is their title?"

        },
        {
            name: "salaryNumber",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "departmentId",
            type: "input",
            message: "What is the department ID number?"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [response.titleName, response.salaryNumber, response.departmentId], function(err, res) {
            if (err) throw err;
            console.table(res);
            init();
        }); 
    });
}

function employeeAdd() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "roleId",
            type: "input",
            message: "What is the employee's role ID?"
        },
        {
            name: "managerId",
            type: "input",
            message: "Who is the manager for this employee?"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.roleId, response.managerId], function(err,res) {
            if (err) throw err;
            console.table(res);
            init();
        });
    });
}

function employeeUpdate() {
    inquirer.prompt([
        {
            name: "eUpdate",
            type: "input",
            message: "Which employee would you like to update?"
        },
        {
            name: "rUpdate",
            type: "input",
            message: " What role would you like to update to?"
        }
    ]).then(function(response) {
        connection.query("UPDATE employee SET role_id=? WHERE first_name=?", [response.rUpdate, response.eUpdate], function(err,res) {
            if (err) throw err;
            console.table(res);
            init();
        })
    })
}

