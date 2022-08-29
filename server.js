const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

function beginTracking() {
    inquirer
        .prompt([
            {
            type: 'list',
            name: 'questions',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Finish']
            }
        ])
        .then((response) => {
            switch(response.questions){
                case 'View all departments':
                    // call view function
                    break;
                case 'View all roles':
                    // call view function 
                    break;
                case 'View all employees':
                    // call view function
                    break;
                case 'Add a department':
                    //call add function 
                    break;
                case 'Add a role':
                    //call add function 
                    break;
                case 'Add an employee':
                    //call add function 
                    break; 
                case 'Update an employee role':
                    //call update function
                    break;   
                case 'Finish':
                    console.log("Finished ✔️")
            }
        });
}
beginTracking();










app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 👍`);
  });  