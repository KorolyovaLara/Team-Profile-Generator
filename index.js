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

function addNewEmployee(){
    inquirer
    .prompt(chooseMember)
    .then()
}