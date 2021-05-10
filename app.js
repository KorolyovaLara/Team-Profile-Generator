// List of all packages needed for this application
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const emailValidator = require("email-validator");

// List of all required files
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Logger = require("./lib/Logger");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "dist");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// List of all variable
const allMembers = [];
const log = new Logger();

// Intro for Application
const intoScreen = {
  type: "list",
  name: "welcomeScreen",
  message: `
    === Welcome to the Team Profile Generator Application ===

    This program will allow the user to build a team and to create an HTML that will display the information for the team, including details of each member.

    Do you wish to continue with this application?
    `,
  choices: ["Yes, Start Building Team", "No, Close Application"],
};

// Manager Questions
const addManager = [
  {
    type: "input",
    name: "name",
    message: "What is the manager's name?",
    validate: function (txt) {
      const letters = /^[a-z ,.'-]+$/i.test(txt);
      if (letters) {
        return true;
      } else {
        log.red(
          `Please enter a valid name that does not include anything other than letters`
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "id",
    message: "What is the manager's id?",
    validate: function (num) {
      const number = /^[0-9]+$/.test(num);
      if (number) {
        return true;
      } else {
        log.red(
          `Please enter a valid ID that does not include anything other than number`
        );
        return false;
      }
    },
  },
  {
    type: "input",
    name: "email",
    message: "What is the manager's email?",
    validate: (value) => {
      if (emailValidator.validate(value)) {
        return true;
      } else {
        return "Please enter valid email address.";
      }
    },
  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is the manager's office phone number?",
    validate: function (num) {
      const number = /^[0-9]+$/.test(num);
      if (number) {
        return true;
      } else {
        log.red(
          `Please enter a valid phone number that does not include anything other than number`
        );
        return false;
      }
    },
  },
];

// Add Engineer and Intern
const addOthers = {
  type: "list",
  name: "addMembers",
  message: `Would you like to add another team member to this team? 
  => Select "YES" to add an Engineer or Intern team member or 
  => Select "NO" if no additional team members need to be added.`,
  choices: ["YES", "NO"],
};

// Selector of the Role for team member
const chooseRole = {
  type: "list",
  name: "role",
  message: "Please choose the role for the employee",
  choices: ["Engineer", "Intern"],
};

// Engineer and Intern Questions
const questions = {
  Engineer: [
    {
      type: "input",
      name: "name",
      message: "What is the engineer's name?",
      validate: function (txt) {
        const letters = /^[a-z ,.'-]+$/i.test(txt);
        if (letters) {
          return true;
        } else {
          log.red(
            `Please enter a valid name that does not include anything other than letters`
          );
          return false;
        }
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the engineer's id?",
      validate: function (num) {
        const number = /^[0-9]+$/.test(num);
        if (number) {
          return true;
        } else {
          log.red(
            `Please enter a valid ID that does not include anything other than number`
          );
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is the engineer's email?",
      validate: (value) => {
        if (emailValidator.validate(value)) {
          return true;
        } else {
          return "Please enter valid email address.";
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "What is the engineer's GitHub username?",
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Please enter engineer's GitHub username.";
        }
      },
    },
  ],
  Intern: [
    {
      type: "input",
      name: "name",
      message: "What is the intern's name?",
      validate: function (txt) {
        const letters = /^[a-z ,.'-]+$/i.test(txt);
        if (letters) {
          return true;
        } else {
          log.red(
            `Please enter a valid name that does not include anything other than letters`
          );
          return false;
        }
      },
    },
    {
      type: "input",
      name: "id",
      message: "What is the intern's id?",
      validate: function (num) {
        const number = /^[0-9]+$/.test(num);
        if (number) {
          return true;
        } else {
          log.red(
            `Please enter a valid ID that does not include anything other than number`
          );
          return false;
        }
      },
    },
    {
      type: "input",
      name: "email",
      message: "What is the intern's email?",
      validate: (value) => {
        if (emailValidator.validate(value)) {
          return true;
        } else {
          return "Please enter valid email address.";
        }
      },
    },
    {
      type: "input",
      name: "school",
      message: "What school/university is the intern attending?",
      validate: (value) => {
        if (value) {
          return true;
        } else {
          return "Please enter the name of school/university.";
        }
      },
    },
  ],
};

// Initial function to start the application
function startApp() {
  inquirer.prompt(intoScreen).then((runApp) => {
    if (runApp.welcomeScreen === "Yes, Start Building Team") {
      log.cyan("Please submit information for Manager of the Team");
      askManager();
    } else {
      log.magenta(`
        === Application Closed ===
        `);
    }
  });
}

// Function to create the team manager and then call the function to start building the team size
function askManager() {
  inquirer.prompt(addManager).then((answer) => {
    const manager = new Manager(
      answer.name,
      answer.id,
      answer.email,
      answer.officeNumber
    );
    // add details to team array
    allMembers.push(manager);
    addTeamMembers();
  });
}

// Function to choose the type of team member (engineer or intern) and prompt questions to build additional class constructors.
function addTeamMembers() {
  inquirer.prompt(addOthers).then((teamSize) => {
    // By choosing yes, you can add another team member to the array. This recals the addNewEmployee funciton which goes throught the questions to add a new team member to the array
    if (teamSize.addMembers === "YES") {
      addNewEmployee();
    }
    if (teamSize.addMembers === "NO") {
      //If no more members need to be added, then the application is ended by choosing No and then the file is written to the HTML template
      generateHTML(allMembers);
    }
  });
}

// Function to add new team members
function addNewEmployee() {
  inquirer.prompt(chooseRole).then((answer) => {
    if (answer.role === "Engineer") {
      inquirer.prompt(questions.Engineer).then((answer) => {
        // save employee details
        const engineer = new Engineer(
          answer.name,
          answer.id,
          answer.email,
          answer.github
        );
        // add details to team array
        allMembers.push(engineer);
        addTeamMembers();
      });
    } else if (answer.role === "Intern") {
      inquirer.prompt(questions.Intern).then((answer) => {
        // save employee details
        const intern = new Intern(
          answer.name,
          answer.id,
          answer.email,
          answer.school
        );
        // add details to team array
        allMembers.push(intern);
        addTeamMembers();
      });
    }
  });
}

// Function to generate HTML
function generateHTML() {
  fs.writeFileSync(outputPath, render(allMembers), "utf-8");
  log.red(`
  === Team Profile Generated ===
  `);
  process.exit(0);
}

// Call startApp function to start the Application
startApp();
