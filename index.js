// List of all packages needed for this application
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const emailValidator = require('email-validator');

// List of all required files
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Logger = require("./lib/Logger");

// List of all variable
const allMembers = [];
const log = new Logger();

// Selector for Member of the Team
const chooseMember = [
    {
        type: "list",
        name: "role",
        message: "Please choose the role for the employee",
        choices: // function to allow only one manager to be created
        () => {
            if (allMembers.some(member => member.role === "Manager")) {
                return ["Engineer", "Intern"]
            } else {
                return ["Manager", "Engineer", "Intern"]
            }
        }
    }
];

// All questions
const questions = {
    Manager: [
        {
            type: "input",
            name: "name",
            message: "What is the manager's name?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter manager's name."} 
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's id?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter manager's id."} 
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?",
            validate: (value) => {
               if (emailValidator.validate(value)) {return true}
               else {return "Please enter valid email address."} 
            },
        },
        {
            type: "input",
            name: "officeNumber",
            message: "What is the manager's office phone number?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter manager's office phone number."} 
            },
        },
        {
            type: "list",
            name: "addNew",
            message: "Do you want to add another employee?",
            choices: ["Yes", "No"],
        },
    ],
    Engineer: [
        {
            type: "input",
            name: "name",
            message: "What is the engineer's name?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter engineer's name."} 
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's id?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter engineer's id."} 
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?",
            validate: (value) => {
               if (emailValidator.validate(value)) {return true}
               else {return "Please enter valid email address."} 
            },
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub username?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter engineer's GitHub username."} 
            },
        },
        {
            type: "list",
            name: "addNew",
            message: "Do you want to add another employee?",
            choices: ["yes", "no"],
        },
    ],
    Intern: [
        {
            type: "input",
            name: "name",
            message: "What is the intern's name?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter intern's name."} 
            },
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's id?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter intern's id."} 
            },
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?",
            validate: (value) => {
               if (emailValidator.validate(value)) {return true}
               else {return "Please enter valid email address."} 
            },
        },
        {
            type: "input",
            name: "school",
            message: "What school/university is the intern attending?",
            validate: (value) => {
               if (value) {return true}
               else {return "Please enter the name of school/university."} 
            },
        },
        {
            type: "list",
            name: "addNew",
            message: "Do you want to add another employee?",
            choices: ["yes", "no"],
        },
    ],
};

// Intro for Application
const intoScreen = {
    type: "list",
    name: "welcomeScreen",
    message : `
    === Welcome to the Team Profile Generator Application ===

    This program will allow the user to build a team and to create an HTML that will display the information for the team, including details of each member.

    Do you wish to continue with this application?
    `,
	choices: ["Yes, Start Building Team", "No, Close Application"],
};

// Initial function to start the application
function startApp() {
    inquirer
    .prompt(intoScreen)
    .then((runApp) => {
        if (runApp.welcomeScreen === "Yes, Start Building Team"){
            log.cyan("Please submit information for Manager");
            addNewEmployee();
        } else {
			log.magenta(`
        === Application Closed ===
        `);
        }
    });
}

// Function to add new team members
function addNewEmployee(){
    inquirer
    .prompt(chooseMember)
    .then((answer) => {
        if (answer.role === "Manager") {
            inquirer
            .prompt(questions.Manager)
            .then(answer => {
                // save employee details
                const manager = new Manager
                (
                    answer.name,
                    answer.id,
                    answer.email,
                    answer.officeNumber,
                );
                // add details to team array
                allMembers.push(manager);
                if (answer.addNew === "Yes"){
                    addNewEmployee();
                } else {generateHTML()};
            }) 
        }

    })
}
// Function to generate HTML
function generateHTML() {
    fs.writeFileSync(outputPath, render(allMembers), "utf-8");
    process.exit(0);
}

// Call startApp function to start the Application
startApp();