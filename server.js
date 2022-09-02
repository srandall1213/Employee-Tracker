const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const { concat } = require('rxjs');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to Database
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

// View Functions
function viewDepts(){
    db.query('SELECT departments.id AS ID, departments.name AS Name FROM departments', (err, results) => {
        if(err) throw err;
        console.table(results);
        startMenu();
    });
}

function viewRoles(){
    db.query('SELECT roles.id AS ID, roles.title AS Title, roles.salary AS Salary, departments.name AS Department FROM roles JOIN departments ON roles.department_id = departments.id', (err, results) => {
        if(err) throw err;
        console.table(results);
        startMenu();
    });
}

function viewEmps(){
    db.query(
        "SELECT employees.id AS ID, employees.first_name AS First, employees.last_name as Last, roles.title AS Title, roles.salary AS Salary, departments.name AS Departments, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON manager.id = employees.manager_id", (err, results) => {
        if(err) throw err;
        console.table(results);
        startMenu();
    });
}

// Add Functions
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
                    console.log(`➕ Added ${response.department} to the database.`),
                    startMenu()
            );
        });
}

function addRole(){
    db.query("SELECT * FROM departments", (err, results) => {
        if(err) throw err;
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
                name: "dept",
                type: "list",
                message: "Which department ID does the role belong to?",
                choices: () => {
                    const deptArr = [];
                    for (const dept of results) {
                        deptArr.push(dept.id);
                    }
                    return deptArr;
                }
            }

        ]).then((response) => {
            db.query(
                'INSERT INTO roles SET ?', 
                {
                    title: response.title,
                    salary: response.salary,
                    department_id: response.dept
                },
                function(err) {
                    if(err) throw err;
                    console.log(`➕ Added ${response.title} to the database.`),
                    startMenu()
                }
            ); 
        });
    });
}

function addEmp(){
    db.query("SELECT * FROM roles", (err, results) => {
        if(err) throw err;
        inquirer 
            .prompt([
                {
                    name: "firstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "lastName",
                    type: "input",
                    message: "What is the employee's last name?",
                },
                {
                    name: "role",
                    type: "list",
                    message: "What is the employee's role?",
                    choices: () => {
                        let roleArr = [];
                        for (const role of results) {
                            roleArr.push(role.id)
                        }
                        return roleArr;
                    }
                    //try to dynamically show the roles as strings, but send them in the response as integers
                },
                {
                    name: "manager",
                    type: "list",
                    message: "Who is the employee's manager?",
                    choices: [1, 3, 5, 7]
                    // choices: ["None", "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"]
                }

            ]).then((response) => {
                db.query(
                    'INSERT INTO employees SET ?', 
                    {
                        first_name: response.firstName,
                        last_name: response.lastName,
                        role_id: response.role,
                        manager_id: response.manager
                    },
                    console.log(`➕ Added ${response.firstName} ${response.lastName} to the database.`),
                    startMenu()
                );
            });
    });
}

// Update Function
function updateEmp(){
    db.query("SELECT * FROM employees", (err, results) => {
        if(err) throw err;
        inquirer 
        .prompt([
            {
                name: "name",
                type: "list",
                message: "Which employee's role do you want to update?",
                choices: () => {

                    const nameArr = [];
                    for (const lastName of results){
                        nameArr.push(lastName.last_name);
                    }
                    return nameArr;
                }
            },
            {
                name: "title",
                type: "list",
                message: "Which role do you want to assign the selected employee?",
                choices: () => {
                    const roleArr = [];
                    for (const role of results) {
                        roleArr.push(role.role_id);
                    }
                    return roleArr;
                }
            }
        ]).then((response) => {
            let lastName = response.name;
            db.query(
                "UPDATE employees SET ? WHERE last_name = ?",
                [
                    {
                        role_id: response.title
                    }, lastName
                ],
                console.log(`⬆️  Updated ${lastName}'s role.`),
                startMenu()
            );
        });
    });           
}

// Port Listening
app.listen(PORT, () => {
    console.log(`\nServer running on port ${PORT} ✨`);
});