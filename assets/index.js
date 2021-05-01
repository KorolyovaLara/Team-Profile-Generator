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

// Selector for Member of the Team

const chooseMember = [
    {
        type: "list",
        name: "teamMember",
        message: "Please choose the role for the employee",
        choices: ["Manager", "Engineer", "Intern"],
    }
];

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
            choices: ["yes", "no"],
        },
    ],
    Engineer: [],
    Intern: [],
};