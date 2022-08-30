const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Snickerdoodle1!',
      database: 'employee_db'
    },
    
    console.log("-----------------------"),
    console.log("| Employee Tracker 🗃️  |"),
    console.log("-----------------------"),
    startMenu()
  );

// Start Employee Tracker
function startMenu() {
    inquirer
        .prompt([
            {

            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: 
                [
                'View all departments', 'View all roles', 'View all employees', 
                'Add a department', 'Add a role', 'Add an employee', 
                'Update an employee role', 'Finish'
                ]
            }
        ])
        .then((response) => {
            switch(response.questions){
                case 'View all departments':
                    viewDepts();
                    break;
                case 'View all roles':
                    viewRoles(); 
                    break;
                case 'View all employees':
                    viewEmps();
                    break;
                case 'Add a department':
                    addDept();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmp();
                    break; 
                case 'Update an employee role':
                    updateEmp();
                    break;   
                case 'Finish':
                    console.log("---------------")
                    console.log("| Finished ✔️  |")
                    console.log("---------------")
            }
        });
}

// VIEW FUNCTIONS

function viewDepts(){
    db.query('SELECT * FROM departments', (err, results) => {
        console.table(results);
        startMenu();
    });
}

function viewRoles(){
    db.query('SELECT * FROM roles', (err, results) => {
        console.table(results);
        startMenu();
    });
}

function viewEmps(){
    db.query('SELECT * FROM employees', (err, results) => {
        console.table(results);
        startMenu();
    });
}

// ADD FUNCTIONS

function addDept(){
    inquirer 
        .prompt([
            {
                name: "department",
                type: "input",
                message: "What is the name of the department?"
            }
        ]).then((response) => {
            db.query(
                'INSERT INTO departments VALUES (DEFAULT, ?)', [response.department],
                    console.log(`➕ Added ${[response.department]} to the database.`),
                    startMenu()
            );
        });
}

function addRole(){
    inquirer 
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "salary",
                type: "number",
                message: "What is the salary of the role?",
            },
            {
                name: "department_id",
                type: "number",
                message: "Which department does the role belong to?"
            }

        ]).then((response) => {
            db.query(
                'INSERT INTO roles SET ?', 
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.department_id
                },
                console.log(`➕ Added ${[response.title]} to the database.`),
                startMenu()
            );
        });
}

function addEmp(){
    db.query('', (err, results) => {
        console.table(results);
        startMenu();
    });
}

// UPDATE FUNCTION

function updateEmp(){
    db.query('', (err, results) => {
        console.table(results);
        startMenu();
    });
}


app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT} ✨`);
  });  